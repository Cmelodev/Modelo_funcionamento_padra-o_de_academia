from django.contrib import admin
from .models import Aluno, Pagamento, Acesso, FichaTreino, Exercicio

admin.site.register(Aluno)
admin.site.register(Pagamento)
admin.site.register(Acesso)
admin.site.register(FichaTreino)
admin.site.register(Exercicio)