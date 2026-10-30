from rest_framework import viewsets, permissions
from .models import Aluno, Pagamento, Acesso, FichaTreino, Exercicio
from .serializers import (
    AlunoSerializer, PagamentoSerializer, AcessoSerializer,
    FichaTreinoSerializer, ExercicioSerializer,
)


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all().order_by("matricula")
    serializer_class = AlunoSerializer
    permission_classes = [permissions.AllowAny]


class PagamentoViewSet(viewsets.ModelViewSet):
    queryset = Pagamento.objects.all()
    serializer_class = PagamentoSerializer
    permission_classes = [permissions.AllowAny]


class AcessoViewSet(viewsets.ModelViewSet):
    queryset = Acesso.objects.all()
    serializer_class = AcessoSerializer
    permission_classes = [permissions.AllowAny]


class FichaTreinoViewSet(viewsets.ModelViewSet):
    queryset = FichaTreino.objects.all()
    serializer_class = FichaTreinoSerializer
    permission_classes = [permissions.AllowAny]


class ExercicioViewSet(viewsets.ModelViewSet):
    queryset = Exercicio.objects.all()
    serializer_class = ExercicioSerializer
    permission_classes = [permissions.AllowAny]