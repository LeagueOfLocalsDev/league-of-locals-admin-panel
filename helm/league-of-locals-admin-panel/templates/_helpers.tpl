{{- define "league-of-locals-admin-panel.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "league-of-locals-admin-panel.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- include "league-of-locals-admin-panel.name" . }}
{{- end }}
{{- end }}

{{- define "league-of-locals-admin-panel.labels" -}}
app.kubernetes.io/name: {{ include "league-of-locals-admin-panel.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end }}

{{- define "league-of-locals-admin-panel.selectorLabels" -}}
app.kubernetes.io/name: {{ include "league-of-locals-admin-panel.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
