# DECREIA G4.7 — Recolha dirigida do coordenador histórico (preparação)

**Data:** 2026-11-14. **Estado:** coletor Windows preparado; **ainda não executado no Windows**.

A auditoria G4.6 encontrou exclusivamente um `gestor.py` em pasta de recuperação histórica; SHA-256 `9b1efedfa457f46eff467b9f960dbd9d43bc869ff8f27d3a1a6ca67f70fbff9a`, 16.102 bytes. Diferente do coordenador SHADOW G3.5.

O pacote **privado** `DECREIA_G4_7_FONTE_COORDENADOR_BIBLIA_0034.zip` contém um lançador CMD autocontido que pode arrancar mesmo de ZIP sem extração manual. Só lê o `gestor.py` inventariado, valida SHA-256 e tamanho, inspeciona a árvore AST e recusa exportar caso encontre possíveis segredos literais; prepara um ZIP com a fonte original, relatório e recibo para revisão **privada**.

Testes locais do coletor: **5/5 PASS**. Integridade do pacote ZIP, manifesto SHA-256 e identidade do Python embutido no CMD: PASS.

**Segurança:** a fonte capturada pode conter informação privada, e a deteção automática de credenciais não é exaustiva. O responsável deve rever o ZIP antes de o enviar. Não publicar o conteúdo no repositório público.

**Gates abertos:** receber e auditar `DECREIA_G4_7_FONTE_COORDENADOR_*.zip`; provar se esse gestor é ou não utilizado em produção; decidir compatibilidade estrutural do contrato `GENOMICA → DNA_ATLAS`. Nenhum código original alterado, nenhum componente promovido, nenhuma validação científica ou clínica inferida.
