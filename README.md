# League of Locals Admin Panel

## Environments and deployments

The admin panel is deployed as the same Helm release
(`league-of-locals-admin-panel`) into isolated Kubernetes namespaces:

| Environment | Namespace | Deployment path | Service port |
| --- | --- | --- | --- |
| Development | `league-of-locals-dev` | Every push to `main` | NodePort `31248` |
| Production | `league-of-locals-prod` | Manual workflow dispatch after validation | NodePort `31247` |

Every image is tagged with its full Git commit SHA. A push builds that image and
deploys it to development. To promote a tested version, run **Build and Deploy
Admin Panel** from the GitHub Actions UI, provide that exact SHA as `image_tag`,
and approve the `production` environment when protection rules are enabled.

The reusable deployment workflow installs Doppler Kubernetes Operator chart
`1.7.1` as the cluster-wide `doppler-operator` release, then installs the Admin
Panel chart in the target namespace. The operator synchronizes the Kubernetes
Secrets from Doppler and restarts the Deployment when they change.

For a local chart render:

```sh
helm lint ./helm/league-of-locals-admin-panel \
  --values ./helm/league-of-locals-admin-panel/values-dev.yaml \
  --set-string image.tag=example-sha \
  --set-string doppler.project=your-project \
  --set-string doppler.config=dev

helm template league-of-locals-admin-panel ./helm/league-of-locals-admin-panel \
  --namespace league-of-locals-dev \
  --values ./helm/league-of-locals-admin-panel/values-dev.yaml \
  --set-string image.tag=example-sha \
  --set-string doppler.project=your-project \
  --set-string doppler.config=dev
```

### Required setup before the first deployment

Create a Doppler project with separate development and production configs (or
separate projects). Each config needs these application values:

- `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET` for that
  environment's Auth0 Regular Web Application.
- `AUTH0_SECRET`, a distinct 32-byte hex value used to encrypt session and
  transaction cookies. Generate one with `openssl rand -hex 32`.
- `DOCKER_CONFIG_JSON` when the GHCR package is private. This must be valid
  Docker config JSON with an `auths.ghcr.io` entry authorized to pull the image.
  For a public image, set `doppler.registry.enabled=false` in the applicable
  values file.

Create a read-only Doppler service token for each config. In both the `dev` and
`production` GitHub Environments, configure:

| Setting | Type | Purpose |
| --- | --- | --- |
| `DOPPLER_PROJECT` | Variable | Doppler project slug for the environment |
| `DOPPLER_CONFIG` | Variable | Doppler config slug for the environment |
| `DOPPLER_SERVICE_TOKEN` | Secret | Read-only token scoped to that config |
| `DO_API_TOKEN` | Secret | DigitalOcean token for cluster access; may instead be repository-wide |

The workflow creates only the environment-specific
`doppler-admin-panel-token` bootstrap Secret. The Helm chart creates two
`DopplerSecret` resources: one maintains
`league-of-locals-admin-panel-secrets` for Auth0 values, and the other maintains
`league-of-locals-admin-panel-ghcr-secret` for the registry credential. The
registry Secret is distinct from the User API's one, so two Doppler resources do
not manage the same Kubernetes Secret.

Register each environment's callback URL (`<external-base-url>/admin/auth/callback`)
and logout URL (`<external-base-url>/admin`) in its Auth0 application. Production
uses `https://admin.leagueoflocals.xyz`; set `app.baseUrl` in
`values-dev.yaml` once development has a stable external hostname. Until then,
the SDK safely derives the development base URL from the incoming request host,
which must still be registered in Auth0.

Give the GitHub `production` Environment the desired approval rule. The reusable
workflow assigns that environment before it accesses the production Doppler
token; neither secret values nor service tokens are stored in Helm values or
Helm release history.

### One-time migration from raw manifests

The former manifest deployment has no namespace and therefore normally resides
in `default`, where it owns NodePort `31247`. Before the first production
deployment, after the required setup is complete, verify and delete only those
legacy resources:

```sh
kubectl -n default get deployment league-of-locals-admin-panel
kubectl -n default get service league-of-locals-admin-panel-svc
kubectl -n default delete deployment league-of-locals-admin-panel
kubectl -n default delete service league-of-locals-admin-panel-svc
```

If the legacy workload is in another namespace, use that namespace instead. Do
not delete a resource unless both its name and namespace match the old Admin
Panel resources. Point the development and production Cloudflare Origin Rules at
their respective NodePorts, and restrict direct access to the origin where
possible.
