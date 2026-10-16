(function () {
  'use strict';

  const questions = [
    {
      category: 'SITUATIONAL AWARENESS',
      prompt: 'A message says your account will close in ten minutes. What should you do first?',
      options: [
        'Click the message link quickly so the account is not closed.',
        'Pause and check the account by opening the official app or a known address yourself.',
        'Reply with your password and ask whether the warning is real.',
        'Forward the message to friends to see if they received it too.'
      ],
      answer: 1,
      explanation: 'Urgency is a common pressure tactic. Avoid the message link and check for alerts through a trusted route you choose independently.'
    },
    {
      category: 'DOMAIN CHECK',
      prompt: 'A login page has a padlock icon, but the domain looks unfamiliar. Which statement is correct?',
      options: [
        'The padlock proves the organisation owns the site.',
        'The site is safe if its logo looks correct.',
        'HTTPS protects the connection but does not prove the site is legitimate.',
        'It is safe to enter a password if the page loads quickly.'
      ],
      answer: 2,
      explanation: 'HTTPS encrypts data in transit. A fraudulent site can also use HTTPS, so verify the domain and reach the service independently.'
    },
    {
      category: 'SOCIAL ENGINEERING',
      prompt: 'Someone claiming to be your manager asks you to buy gift cards and send the codes privately. What is the safest response?',
      options: [
        'Buy them because managers can make urgent requests.',
        'Ask for the gift card brand and send the codes only after that.',
        'Keep the request secret as asked.',
        'Do not pay; verify the request through a known contact method and follow normal approval rules.'
      ],
      answer: 3,
      explanation: 'Unexpected payment requests, authority pressure, and secrecy are strong warning signs. Use a previously trusted channel to verify identity.'
    },
    {
      category: 'LINKS & ATTACHMENTS',
      prompt: 'You receive an unexpected attachment asking you to enable macros to view an invoice. What should you do?',
      options: [
        'Do not enable macros; verify the message with the sender using a known contact method or report it.',
        'Enable macros if the document uses your company colours.',
        'Download it to a personal device instead.',
        'Open it several times to check whether the prompt goes away.'
      ],
      answer: 0,
      explanation: 'Unexpected attachments and requests to enable active content warrant caution. Verify through a separate, trusted channel and follow reporting procedures.'
    },
    {
      category: 'INCIDENT RESPONSE',
      prompt: 'You entered your password into a page that now seems suspicious. What should you do next?',
      options: [
        'Wait several days to see if the account behaves oddly.',
        'Change the exposed password through the genuine service, revoke sessions if available, review MFA, and report it to IT if it is a work account.',
        'Send your password to support so they can check it.',
        'Only delete the message; no other action is needed.'
      ],
      answer: 1,
      explanation: 'Act promptly through the legitimate service: change the exposed password, address reused passwords, revoke sessions if possible, review authentication settings, and report the incident.'
    }
  ];

  // Expose pure quiz data/helpers so the scoring rules can be checked without a browser.
  const quizLogic = {
    questions,
    isCorrect(questionIndex, selectedIndex) {
      return Number.isInteger(questionIndex) && Number.isInteger(selectedIndex) &&
        questions[questionIndex] !== undefined && questions[questionIndex].answer === selectedIndex;
    },
    score(answers) {
      return questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
    }
  };
  if (typeof globalThis !== 'undefined') globalThis.PhishGuardQuiz = quizLogic;

  if (typeof document === 'undefined') return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Mobile navigation: close it after choosing a destination and keep the state announced.
  const navToggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }

  const form = $('#quiz-form');
  const fieldset = $('#answer-options');
  const submit = $('#quiz-submit');
  const feedback = $('#quiz-feedback');
  const content = $('#quiz-content');
  const results = $('#quiz-results');
  const stepLabel = $('#quiz-step-label');
  const progress = $('#quiz-progress');
  const progressFill = $('#quiz-progress-fill');
  const questionTitle = $('#quiz-title');
  const category = $('#question-category');
  const restart = $('#quiz-restart');
  let currentIndex = 0;
  let selectedIndex = null;
  let answers = Array(questions.length).fill(null);
  let locked = false;

  function setProgress(value) {
    if (progress) progress.setAttribute('aria-valuenow', String(value));
    if (progressFill) progressFill.style.width = `${(value / questions.length) * 100}%`;
  }

  function renderQuestion() {
    const question = questions[currentIndex];
    selectedIndex = null;
    locked = false;
    stepLabel.textContent = `QUESTION ${String(currentIndex + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
    category.textContent = question.category;
    questionTitle.textContent = question.prompt;
    fieldset.replaceChildren(fieldset.querySelector('legend'));
    question.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'answer-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'quiz-answer';
      input.value = String(index);
      input.addEventListener('change', () => {
        selectedIndex = index;
        submit.disabled = false;
      });
      const text = document.createElement('span');
      text.textContent = option;
      label.append(input, text);
      fieldset.append(label);
    });
    submit.disabled = true;
    submit.hidden = false;
    submit.textContent = 'Check answer →';
    feedback.hidden = true;
    feedback.className = 'quiz-feedback';
    feedback.replaceChildren();
    setProgress(currentIndex);
  }

  function showFeedback(isCorrect, question) {
    feedback.hidden = false;
    feedback.className = `quiz-feedback${isCorrect ? '' : ' feedback-wrong'}`;
    const heading = document.createElement('strong');
    heading.textContent = isCorrect ? 'Correct — good call.' : 'Not quite. Here is the safer choice.';
    const explanation = document.createElement('span');
    explanation.textContent = question.explanation;
    feedback.replaceChildren(heading, explanation);
  }

  function finishQuiz() {
    const score = quizLogic.score(answers);
    content.hidden = true;
    results.hidden = false;
    stepLabel.textContent = 'COMPLETE';
    setProgress(questions.length);
    $('#result-score').textContent = `${score}/${questions.length}`;
    const resultTitle = $('#result-title');
    const resultCopy = $('#result-copy');
    if (score === questions.length) {
      resultTitle.textContent = 'Excellent pattern recognition.';
      resultCopy.textContent = 'You identified every safest response. Keep verifying unexpected requests through trusted channels.';
    } else if (score >= 3) {
      resultTitle.textContent = 'Good progress. Keep practising.';
      resultCopy.textContent = 'You recognised several warning signs. Review the explanations and practise slowing down when a message creates pressure.';
    } else {
      resultTitle.textContent = 'Use the explanations to build the habit.';
      resultCopy.textContent = 'Phishing messages are designed to rush people. Review the safety guide and try again—verify first, then act.';
    }
  }

  if (form && fieldset && submit && feedback && content && results) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (locked || selectedIndex === null) return;
      locked = true;
      const question = questions[currentIndex];
      answers[currentIndex] = selectedIndex;
      const correct = quizLogic.isCorrect(currentIndex, selectedIndex);
      $$('.answer-option', fieldset).forEach((label, index) => {
        const input = $('input', label);
        input.disabled = true;
        if (index === question.answer) label.classList.add('is-correct');
        if (index === selectedIndex && !correct) label.classList.add('is-wrong');
      });
      submit.disabled = true;
      submit.hidden = true;
      setProgress(currentIndex + 1);
      showFeedback(correct, question);
      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'next-button';
      next.textContent = currentIndex === questions.length - 1 ? 'See my result →' : 'Next question →';
      next.addEventListener('click', () => {
        if (currentIndex < questions.length - 1) {
          currentIndex += 1;
          renderQuestion();
          questionTitle.focus?.();
        } else finishQuiz();
      });
      feedback.append(document.createElement('br'), next);
      next.focus();
    });
    restart.addEventListener('click', () => {
      currentIndex = 0;
      selectedIndex = null;
      answers = Array(questions.length).fill(null);
      locked = false;
      results.hidden = true;
      content.hidden = false;
      renderQuestion();
      questionTitle.focus?.();
    });
    renderQuestion();
  }

  // Checklist state stays in memory only; it is never stored or transmitted.
  const checklistItems = $$('.check-row input[type="checkbox"]');
  const checklistStatus = $('#checklist-status');
  function updateChecklist() {
    const checked = checklistItems.filter(item => item.checked).length;
    if (checklistStatus) checklistStatus.textContent = `${checked} of ${checklistItems.length} habits reviewed`;
  }
  checklistItems.forEach(item => item.addEventListener('change', updateChecklist));
})();
