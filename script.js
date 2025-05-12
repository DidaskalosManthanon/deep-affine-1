// Variables pour suivre la progression
        let currentQuestion = 1;
        const totalQuestions = 5;
        let selectedOptions = {};
        
        // Réponses correctes pour les QCM
        const correctAnswers = {
            1: 1, // Option 1: droite horizontale
            2: 3, // Option 3: fonction constante f(x) = 2
            3: 1, // Option 1: C(-3, y) avec y ≠ 2
            4: 3, // Option 3: Non, pas de fonction
            5: 2  // Option 2: fonction affine h(x) = -0,75x + 8
        };

        // Mise à jour de la barre de progression
        function updateProgressBar() {
            const progress = (currentQuestion - 1) / totalQuestions * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        // Afficher l'aide
        function showHelp(questionNum) {
            const helpElement = document.getElementById('help' + questionNum);
            helpElement.style.display = helpElement.style.display === 'block' ? 'none' : 'block';
        }

        // Soumettre la réponse
        function submitAnswer(questionNum) {
            // Masquer les solutions précédentes si visibles
            document.getElementById('solution' + questionNum).style.display = 'none';
            
            // Afficher les options QCM
            document.getElementById('qcm' + questionNum).style.display = 'block';
            
            // Désactiver le bouton de soumission
            document.querySelector(`#question${questionNum} .submit-btn`).disabled = true;
        }

        // Sélectionner une option QCM
        function selectOption(element, questionNum, optionNum) {
            // Désélectionner toutes les options
            const options = document.querySelectorAll(`#qcm${questionNum} .qcm-option`);
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Sélectionner l'option cliquée
            element.classList.add('selected');
            selectedOptions[questionNum] = optionNum;
            
            // Vérifier la réponse
            const feedbackElement = document.getElementById('feedback' + questionNum);
            if (optionNum === correctAnswers[questionNum]) {
                feedbackElement.className = 'feedback correct';
                feedbackElement.innerHTML = '<p>✓ Correct ! Bien joué.</p>';
                
                // Afficher la solution complète
                document.getElementById('solution' + questionNum).style.display = 'block';
                
                // Afficher le bouton pour passer à la question suivante
                document.getElementById('next' + questionNum).style.display = 'block';
            } else {
                feedbackElement.className = 'feedback incorrect';
                feedbackElement.innerHTML = '<p>✗ Incorrect. Essayez à nouveau.</p>';
            }
        }

        // Passer à la question suivante
        function nextQuestion(questionNum) {
            // Masquer la question actuelle
            document.getElementById('question' + questionNum).style.display = 'none';
            
            // Si c'est la dernière question, afficher la solution finale
            if (questionNum === totalQuestions) {
                document.getElementById('finalSolution').style.display = 'block';
                document.getElementById('geogebra').style.display = 'block';
                updateProgressBar();
                return;
            }
            
            // Sinon, afficher la question suivante
            currentQuestion = questionNum + 1;
            document.getElementById('question' + currentQuestion).style.display = 'block';
            updateProgressBar();
        }

        // Initialiser la barre de progression
        updateProgressBar();