SEMAINE CODING 09-15 MARS 2026

**PROJET 5 : APPLICATION D\'AIDE AU DIAGNOSTIC MÉDICAL**

**DIAGNOSTIC DE L\'APPENDICITE PÉDIATRIQUE AVEC ML EXPLICABLE (SHAP)**

Votre tâche consiste à développer une application d\'aide à la décision
clinique visant à assister les pédiatres dans le diagnostic précis de
l\'appendicite chez l\'enfant, à partir des symptômes et des résultats
d\'examens cliniques. Compte tenu du contexte médical critique, votre
modèle doit fournir des prédictions transparentes, fiables et
explicables.

**Objectifs du Projet :**

-   **Développer un modèle de machine learning robuste et explicable.**
    Développer

-   **Assurer la transparence des prédictions du modèle grâce à
    l\'explicabilité SHAP.** Assurer la transparence

-   **Créer une interface utilisateur intuitive (Streamlit ou Flask).**
    Créer

-   **Suivre les bonnes pratiques de développement logiciel
    professionnel (GitHub, CI/CD automatisé).** Suivre les bonnes
    pratiques

-   **Démontrer l\'ingénierie de prompt en documentant clairement les
    prompts générés par IA utilisés dans votre workflow.** Démontrer

**Jeu de Données**

Vous utiliserez le jeu de données suivant :

https://archive.ics.uci.edu/dataset/938/regensburg+pediatric+appendicitis

**Analyse Préliminaire des Données (Questions Critiques) :**

Documentez clairement votre analyse dans votre notebook
(notebooks/eda.ipynb) :

-   Valeurs manquantes :

Y a-t-il des valeurs manquantes dans le jeu de données ? Si oui, comment
allez-vous les traiter ?

-   Valeurs aberrantes :

Y a-t-il des valeurs aberrantes significatives ? Documentez clairement
votre méthode de traitement.

-   Déséquilibre des classes :

```{=html}
<!-- -->
```
-   Évaluez clairement l\'équilibre du jeu de données :

-   Le jeu de données est approximativement équilibré (\~50%
    appendicite, \~50% pas d\'appendicite).

-   Indiquez clairement si vous avez décidé d\'appliquer des techniques
    de rééquilibrage.

```{=html}
<!-- -->
```
-   Corrélation :

Certaines variables sont-elles fortement corrélées ? Documentez
clairement votre approche de gestion.

**Modèles ML Recommandés (Choisissez au moins 3) :**

Choisissez et évaluez au moins trois des modèles suivants :

-   Classifieur SVM

-   Classifieur Random Forest

-   Classifieur LightGBM

-   Classifieur CatBoost

Évaluez les performances à l\'aide de : ROC-AUC, précision (accuracy),
précision (precision), rappel (recall) et F1-score.

Documentez clairement votre raisonnement pour le modèle final
sélectionné.

**Analyses Supplémentaires Requises :**

**Optimisation de la mémoire :**

Certaines variables du jeu de données consomment plus de mémoire que
nécessaire.

-   **Développer une fonction (optimize_memory(df)) dans
    data_processing.py qui optimise systématiquement l\'utilisation de
    la mémoire en ajustant les types de données (ex. float64 vers
    float32, int64 vers int32).** Tâche :

-   Démontrez clairement l\'amélioration de la mémoire avant et après
    optimisation dans votre notebook.

**Explicabilité SHAP :**

Intégrez clairement SHAP pour assurer la transparence :

-   Générez des graphiques récapitulatifs SHAP clairs.

-   Fournissez des visualisations intuitives mettant en évidence les
    symptômes clés et les résultats d\'examens influençant les
    prédictions.

**Développement de l\'Interface (Streamlit ou Flask) :**

Construisez une interface web claire et intuitive qui :

-   Permet aux pédiatres de saisir les symptômes, les données
    démographiques et cliniques.

-   Fournit des prédictions clairement compréhensibles sur
    l\'appendicite pédiatrique.

-   Présente des visualisations SHAP facilement interprétables.

**Dépôt GitHub & Workflow :**

Chaque équipe doit créer son propre dépôt GitHub (sans fork). Structurez
votre dépôt de manière professionnelle et incluez un workflow GitHub
Actions (.github/workflows) pour automatiser les tests et l\'intégration
continue.

**Architecture de Projet Requise**

Votre dépôt doit suivre la structure suivante :

> project/
>
> \|\-- data/
>
> \|\-- notebooks/
>
> \| eda.ipynb
>
> \|\-- src/
>
> \| data_processing.py
>
> \| train_model.py
>
> \| evaluate_model.py
>
> \|\-- app/
>
> \| app.py
>
> \|\-- tests/
>
> \|\-- requirements.txt
>
> \|\-- Dockerfile
>
> \`\-- README.md

**Description**

-   notebooks/ : analyse exploratoire des données

-   src/ : pipeline ML principal (traitement des données, entraînement,
    évaluation)

-   app/ : interface web (Streamlit ou Flask)

-   tests/ : tests automatisés

-   README.md : documentation de votre projet

**Exigences de Tests Automatisés**

Votre projet doit inclure au moins un test automatisé.

Structure exemple :

> tests/
>
> test_data_processing.py

Exemples de tests :

-   vérifier la gestion des valeurs manquantes

-   vérifier la fonction optimize_memory(df)

-   vérifier le chargement du modèle et les prédictions

Ces tests doivent être exécutés automatiquement via GitHub Actions.

**Répartition des Tâches et Gestion (Avec Trello) :**

Pour gérer efficacement votre projet, nous recommandons d\'utiliser
Trello : https://trello.com/

-   Configurez un tableau Trello pour votre équipe.

-   Définissez clairement les tâches et les responsabilités (ex. :
    prétraitement des données, entraînement du modèle, analyse SHAP,
    développement de l\'interface, etc.).

-   Mettez régulièrement à jour le tableau Trello pour suivre
    l\'avancement clairement :

```{=html}
<!-- -->
```
-   À faire

-   En cours

-   En révision

-   Terminé

**Documentation de l\'Ingénierie de Prompt :**

Pour acquérir de l\'expérience en ingénierie de prompt :

-   Sélectionnez une tâche spécifique de votre projet (ex. : fonction
    d\'optimisation mémoire, prétraitement des données, évaluation du
    modèle).

-   Documentez clairement les prompts exacts utilisés (avec Copilot ou
    ChatGPT), ainsi que les résultats correspondants.

-   Discutez de l\'efficacité de vos prompts et des améliorations
    possibles.

Incluez ces détails clairement dans votre documentation de projet
(README.md ou fichier markdown dédié).

**Questions Critiques pour votre README :**

Répondez explicitement aux questions suivantes :

-   Le jeu de données était-il équilibré ? Si non, comment avez-vous
    géré le déséquilibre ? Quel en a été l\'impact ?

-   Quel modèle ML a obtenu les meilleures performances ? Fournissez les
    métriques de performance.

-   Quelles variables médicales ont le plus influencé les prédictions
    (résultats SHAP) ?

-   Quels enseignements l\'ingénierie de prompt a-t-elle apportés pour
    la tâche sélectionnée ?

**Liste de Vérification des Livrables Finaux :**

Assurez-vous que votre dépôt contient :

-   Un code structuré de manière professionnelle.

-   Une analyse exploratoire, une gestion du déséquilibre de classes et
    des étapes d\'entraînement du modèle clairement documentées.

-   Une intégration fonctionnelle de l\'explicabilité SHAP.

-   Une interface web intuitive.

-   Un pipeline CI/CD fonctionnel (GitHub Actions).

-   Une fonction d\'optimisation mémoire clairement implémentée.

-   Une documentation complète, incluant votre tâche d\'ingénierie de
    prompt.

-   **Reproductibilité**

Votre projet doit être entièrement reproductible. Un utilisateur doit
pouvoir exécuter le projet avec :

> pip install -r requirements.txt
>
> python src/train_model.py
>
> streamlit run app/app.py

Votre README doit expliquer clairement comment :

-   installer les dépendances

-   entraîner le modèle

-   lancer l\'application

**Vous avez jusqu\'au dimanche 15 à midi pour livrer votre projet avec
succès.**

**Bonne chance !**

k\. Zerhouni & Team
