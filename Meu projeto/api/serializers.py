from rest_framework import serializers
from .models import Aluno, Pagamento, Acesso, FichaTreino, Exercicio


class ExercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercicio
        fields = ["id", "nome", "series", "repeticoes", "carga"]


class FichaTreinoSerializer(serializers.ModelSerializer):
    exercicios = ExercicioSerializer(many=True, read_only=True)

    class Meta:
        model = FichaTreino
        fields = ["id", "professor", "objetivo", "dias", "exercicios"]


class AcessoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acesso
        fields = ["id", "hora", "status"]


class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = ["id", "plano", "valor", "vencimento", "status", "data_pagamento"]


class AlunoSerializer(serializers.ModelSerializer):
    ficha = FichaTreinoSerializer(read_only=True)
    acessos = AcessoSerializer(many=True, read_only=True)
    pagamentos = PagamentoSerializer(many=True, read_only=True)

    class Meta:
        model = Aluno
        fields = [
            "matricula", "nome", "email", "telefone", "plano",
            "status", "desde", "ultimo_pagamento", "professor",
            "ficha", "acessos", "pagamentos",
        ]