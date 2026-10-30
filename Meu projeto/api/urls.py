from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"alunos", views.AlunoViewSet, basename="aluno")
router.register(r"pagamentos", views.PagamentoViewSet, basename="pagamento")
router.register(r"acessos", views.AcessoViewSet, basename="acesso")
router.register(r"fichas", views.FichaTreinoViewSet, basename="ficha")
router.register(r"exercicios", views.ExercicioViewSet, basename="exercicio")

urlpatterns = [
    path("", include(router.urls)),
]