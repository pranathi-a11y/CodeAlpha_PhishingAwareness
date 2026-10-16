# PhishGuard — Phishing Awareness Training

**Live website:** https://phishguard-codealpha.vercel.app/

PhishGuard is an offline-friendly, responsive educational website created as a cybersecurity internship project. It teaches people to recognise phishing indicators, verify unexpected requests safely, and respond proportionately to suspected incidents. It is an independent educational project, not an official CodeAlpha product or security service.

## Features mapped to the CodeAlpha task

- **Online awareness module:** concise explanations of phishing emails, lookalike websites, social engineering, urgency, suspicious links, and attachments.
- **Recognition practice:** three clearly labelled fictional simulations for account-security pressure, delivery-fee lures, and workplace impersonation. No simulation links are functional.
- **Documented real-world examples:** Ubiquiti Networks' 2015 business-email-compromise fraud and Twitter's July 2020 phone spear-phishing/social-engineering incident. The cases are described separately and link to primary-source company/SEC reporting.
- **Prevention guidance:** domain checking, limitations of HTTPS indicators, independent verification, credential protection, reporting, and incident-response steps.
- **Interactive quiz:** five multiple-choice questions, answer feedback, explanations, progress, score summary, and restart.
- **Privacy-minded implementation:** no backend, accounts, analytics, external dependencies, form submissions, or collection of credentials/personal data.
- **Responsive and accessible layout:** semantic sections, skip link, mobile navigation, visible keyboard focus, labels, status messages, and reduced-motion support.

## Project structure

```text
PhishGuard_CodeAlpha_Project/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── app.js
```

## Run locally

No installation, build step, package manager, or server is required. Keep the files in this structure and open `index.html` in a modern browser. Since the stylesheet and JavaScript are local files and no remote assets are loaded, the core experience works offline.

For a simple local server (optional), run from the project directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Stop the server with `Ctrl+C` when finished.

## Testing and validation

A lightweight JavaScript logic check can be run without installing dependencies:

```bash
node - <<'NODE'
require('./js/app.js');
const quiz = globalThis.PhishGuardQuiz;
if (!quiz || quiz.questions.length !== 5) throw new Error('Expected exactly five quiz questions');
quiz.questions.forEach((question, index) => {
  if (!question.prompt || question.options.length < 2 || !question.explanation) throw new Error(`Incomplete question ${index + 1}`);
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) throw new Error(`Invalid answer index ${index + 1}`);
});
const perfect = quiz.questions.map(question => question.answer);
if (quiz.score(perfect) !== 5) throw new Error('Perfect score calculation failed');
const zero = quiz.questions.map(question => (question.answer + 1) % question.options.length);
if (quiz.score(zero) !== 0) throw new Error('Zero score calculation failed');
const mixed = quiz.questions.map((question, index) => index % 2 === 0 ? question.answer : (question.answer + 1) % question.options.length);
if (quiz.score(mixed) !== 3) throw new Error('Mixed score calculation failed');
if (!quiz.isCorrect(0, quiz.questions[0].answer) || quiz.isCorrect(0, -1)) throw new Error('Answer validation failed');
console.log('PASS: five-question data, answer indices, correct/incorrect answers, and scoring edge cases.');
NODE
```

Also manually check in a browser:

1. Visit every navigation anchor, including mobile navigation, and check that the menu closes after selecting a destination.
2. Answer all five quiz questions correctly; confirm 5/5. Restart and select wrong answers; confirm explanations and the score are accurate. Try a mixed score and restart again.
3. Use Tab/Shift+Tab, Enter, Space, and arrow keys as applicable. Confirm visible focus and that all quiz options can be selected from the keyboard.
4. Test a narrow mobile viewport and a desktop viewport. Confirm no horizontal overflow or overlapping content.
5. Disconnect from the network and reload; the educational content, CSS, quiz, and checklist should still work.
6. Inspect the browser console and network panel for JavaScript errors, missing local files, or unexpected requests.

Automated browser interaction testing was not included in this project package. The quiz's data and scoring functions are testable with Node as above; full UI, keyboard, responsive and offline checks still require manual browser verification.

## Real-world case study sources

1. **Ubiquiti Networks, Form 10-K (filed 2016; describes June 2015 business email compromise):** [SEC filing](https://www.sec.gov/Archives/edgar/data/1511737/000151173716000040/ubnt-06302016x10k.htm). The company reported employee impersonation and fraudulent requests targeting finance and transfers aggregating $46.7 million. Details in the site are paraphrased, not quoted.
2. **Twitter, “An update on our security incident” (July 18, updated July 30, 2020):** [Company incident update](https://blog.x.com/en_us/topics/company/2020/an-update-on-our-security-incident). The company described a phone spear-phishing attack on employees and reported the account impact included in the case study. The site clarifies that this was broader social engineering, not only mass email phishing.

The lessons and defensive recommendations are educational interpretation of the documented events. For complete context, consult the linked primary sources.

## Security and accessibility notes

- No passwords, one-time codes, personal information, or quiz answers are submitted or persisted. Answers and checklist state exist only in the current page session.
- Simulation “buttons” are decorative and not links. They do not navigate or collect information.
- External case-study source links open separately using `rel="noopener noreferrer"`; the core site does not depend on them to function.
- HTTPS helps encrypt a connection but does not establish the legitimacy of the website operator.
- The project is educational and is not a substitute for an organisation's security policy or incident-response process.

## Known limitations

- The site does not include a backend, account system, analytics, or live threat intelligence.
- External case-study links require a network connection, but the rest of the page and quiz are offline-friendly.
- Browser UI behavior, accessibility with assistive technology, and multiple browser/device combinations should be verified manually before final submission.
