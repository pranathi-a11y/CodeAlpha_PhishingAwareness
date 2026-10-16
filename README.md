# PhishGuard — Phishing Awareness Training

PhishGuard is a small, responsive educational website designed to help users recognise common phishing tactics and make safer decisions online. It was created for the **CodeAlpha Cyber Security internship task: Phishing Awareness Training**.

The project focuses on practical awareness rather than detecting live threats. Users can review examples, learn warning signs, follow a prevention checklist, and test their understanding with a short quiz.

## Features

- **Awareness lessons:** Learn how phishing emails, suspicious links, fake websites, urgent requests, attachments, and social engineering are used to deceive people.
- **Fictional practice scenarios:** Review examples involving account-security pressure, delivery-fee lures, and workplace impersonation, with guidance on the warning signs.
- **Real-world case studies:** Read short summaries of documented security incidents and follow links to the original sources.
- **Prevention checklist:** Review practical habits for checking links and domains, verifying unexpected requests through a separate channel, protecting accounts, and reporting suspicious messages.
- **Interactive quiz:** Answer five multiple-choice questions, receive feedback and explanations, view the final score, and restart the quiz.
- **Responsive interface:** Use the site on desktop or mobile screens.
- **No account or data collection:** The project has no backend, login, analytics, or credential-collection feature.

## Tech stack

- **HTML5** — page structure and content
- **CSS3** — layout, styling, and responsive presentation
- **Vanilla JavaScript** — navigation and interactive learning activities

There are no third-party packages or build tools to install.

## Getting started

1. Download this repository or clone it to your computer.
2. Keep the files and folders in the structure shown below.
3. Open `index.html` in a modern web browser.

No installation or build step is required. The website's core content and interactive activities use local files. Opening the real-world case-study links requires an internet connection.

## Project structure

```text
CodeAlpha_PhishingAwareness/
├── index.html
├── favicon.ico
├── README.md
├── css/
│   └── style.css
└── js/
    └── app.js
```

## Real-world case studies

The website references these incidents to illustrate how social engineering and impersonation can lead to serious security and financial consequences:

- **Ubiquiti Networks — business email compromise:** The company's 2016 Form 10-K describes a fraud discovered in June 2015 involving employee impersonation and fraudulent transfer requests. [Read the SEC filing](https://www.sec.gov/Archives/edgar/data/1511737/000151173716000040/ubnt-06302016x10k.htm).
- **Twitter — July 2020 security incident:** Twitter's incident update describes an employee-targeted phone spear-phishing and social-engineering attack. This case is broader than conventional email phishing and is included to show how attackers can manipulate people and internal processes. [Read the incident update](https://blog.x.com/en_us/topics/company/2020/an-update-on-our-security-incident).

The summaries are educational and do not replace the original reports. Consult the linked sources for full context.

## Privacy and safety

- The phishing scenarios are fictional learning examples.
- The site does not ask users to enter passwords, one-time codes, or other sensitive information.
- Quiz interaction is handled in the browser; there is no backend submission.
- The project does not provide live threat detection, threat intelligence, or incident response.

## Disclaimer

PhishGuard is an educational project for cybersecurity awareness. It is not an official CodeAlpha product, a security scanner, or a substitute for your organisation's security policies. Always verify unexpected requests using a trusted, independent contact method.
