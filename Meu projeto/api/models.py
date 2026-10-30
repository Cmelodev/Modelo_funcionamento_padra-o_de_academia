from django.db import models


class Aluno(models.Model):
    STATUS_CHOICES = [("Ativo", "Ativo"), ("Inadimplente", "Inadimplente"), ("Inativo", "Inativo")]

    matricula = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=120)
    email = models.EmailField()
    telefone = models.CharField(max_length=30, blank=True)
    plano = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Ativo")
    desde = models.CharField(max_length=20, blank=True)
    ultimo_pagamento = models.CharField(max_length=20, blank=True)
    professor = models.CharField(max_length=120, blank=True)

    def __str__(self):
        return f"{self.nome} ({self.matricula})"


class Pagamento(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name="pagamentos")
    plano = models.CharField(max_length=20)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    vencimento = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    data_pagamento = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.aluno.nome} - {self.plano}"


class Acesso(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name="acessos")
    hora = models.CharField(max_length=40)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.aluno.nome} - {self.hora}"


class FichaTreino(models.Model):
    aluno = models.OneToOneField(Aluno, on_delete=models.CASCADE, related_name="ficha")
    professor = models.CharField(max_length=120)
    objetivo = models.CharField(max_length=60)
    dias = models.CharField(max_length=40)

    def __str__(self):
        return f"Ficha de {self.aluno.nome}"


class Exercicio(models.Model):
    ficha = models.ForeignKey(FichaTreino, on_delete=models.CASCADE, related_name="exercicios")
    nome = models.CharField(max_length=120)
    series = models.CharField(max_length=20)
    repeticoes = models.CharField(max_length=20)
    carga = models.CharField(max_length=20)

    def __str__(self):
        return self.nome