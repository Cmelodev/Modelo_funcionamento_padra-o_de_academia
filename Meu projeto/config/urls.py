from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("", TemplateView.as_view(template_name="index.html"), name="dashboard"),
    path("index.html", TemplateView.as_view(template_name="index.html")),
    path("alunos.html", TemplateView.as_view(template_name="alunos.html")),
    path("financeiro.html", TemplateView.as_view(template_name="financeiro.html")),
    path("acessos.html", TemplateView.as_view(template_name="acessos.html")),
    path("treinos.html", TemplateView.as_view(template_name="treinos.html")),
    path("relatorios.html", TemplateView.as_view(template_name="relatorios.html")),
    path("aluno.html", TemplateView.as_view(template_name="aluno.html")),
]