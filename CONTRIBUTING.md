# Contributing to Percupuff

## Introduction

> First off, thank you for considering contributing to Percupuff! This project depends on community contributions to grow and improve. We're excited to see what you can come up with!

Following these guidelines helps us manage the project effectively and shows respect for the maintainers' time. In return, we will do our best to respond to your issues, review your changes, and help you finalize your pull requests.

We welcome all kinds of contributions. This includes:

- 🐛 Submitting bug reports and feature requests.
- 📖 Improving documentation (both on the project itself and on audio programming and synthesis in general).
  - Anything you can do to make it newbie friendly would be GREATLY appreciated!
- 🧪 Writing tests for the DSP or view code.
- 🎨 Implementing a new percussion instrument, or improving existing ones.
- 🔧 Improving the developer experience.
- 💡 Sharing ideas and feedback in discussions.
  - If you are new to audio programming, did this project help? If not, how might it improve to do so?

## Ground Rules

We expect everyone involved in the project to adhere to our [Code of Conduct](https://github.com/lilyvanoekel/percupuff/blob/main/CODE_OF_CONDUCT.md). Please make sure you read and understand it.

A few technical responsibilities:

- **Test your changes:** Ensure your work doesn't break existing functionality. Run the project after making changes.
- **Target the `main` branch:** Please base your work on the latest code in the `main` branch.
- **One change per pull request:** Keep your PRs focused on a single issue or feature to make them easier to review. For example, implement one drum sound per PR.
- **Be patient:** We are a small team maintaining this project in our free time. We will get to your issue or PR as soon as we can.
- **First come, first serve:** Picking up an issue is on a "first come, first serve" basis. The first person to comment on an issue will be the one assigned to it. If an issue is assigned to someone, but there have not been any updates for a month, it's acceptable to ask if you can take over. The original person assigned to the ticket then has a week to respond. Alternatively, for bigger issues that allow it, it's also acceptable at any time to propose collaborating, but it's up to the first person to decide if they are interested.

## Your First Contribution

This project is open to people of any experience with audio programming. We have tried to make it accessible, although there is always room for improvement in that regard.

Please have a look at [good first issues](https://github.com/lilyvanoekel/percupuff/issues?q=is%3Aissue%20state%3Aopen%20no%3Aassignee%20label%3A%22good%20first%20issue%22%20label%3Astatus%3Aready) for tasks that are beginner friendly and well suited for your first contribution.

If you are looking for something slightly more challenging, use the issue labels on github to find an appropriate task.

- [Find unassigned tickets](https://github.com/lilyvanoekel/percupuff/issues?q=is%3Aissue%20state%3Aopen%20no%3Aassignee%20label%3Astatus%3Aready) with `status:ready` first, then:
- `area` labels let you pick front-end, DSP (CMajor), or "full-stack" issues.
- `cmajor` labels indicate how much CMajor knowledge is expected to be required.
- `complexity` is a rough estimate of how complicated something will be to implement.

If you want to dive right in, have a look at the [General MIDI Percussion Key Map](https://github.com/lilyvanoekel/percupuff#general-midi-percussion-key-map) in the README and finding an instrument that is marked "Not Implemented" (and cross reference with issues to make sure no one else has picked it up yet). Improving one of the existing sounds is also always an option!

**Working on your first Pull Request?** You can learn how from GitHub's guide: [How to Contribute to an Open Source Project](https://opensource.guide/how-to-contribute/).

## Getting Started

To contribute code, you'll need to set up a local development environment. The process is similar to what's in the README, but focused on contribution.

### Prerequisites

- VSCode
- [Cmajor Tools extension](https://marketplace.visualstudio.com/items?itemName=CmajorSoftware.cmajor-tools)
- Node.js and npm

### The Contribution Workflow

1.  **Fork the repo** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/<your-username>/percupuff.git
    cd percupuff
    ```
3.  **Build the view:** You must do this first before running the project.
    ```bash
    cd view
    npm install
    npm run build
    cd ..
    ```
4.  **Open the project** in VSCode and open `percupuff.cmajorpatch`.
5.  **Create a branch** for your changes:
    ```bash
    git checkout -b feat/add-low-tom-implementation # or a similar descriptive name
    ```
6.  **Make your changes.** This could be:
    - Adding a new Cmajor file in `dsp/drums/`.
    - Fixing a bug in existing code.
    - Updating the view.
    - Adding tests.
7.  **Test your changes:** Use the `Cmajor: Run patch` command from the palette to test your changes in the live audio engine (if working on the view make sure you build the view before testing your changes).
8.  **Commit your changes:** Please write clear, descriptive commit messages.
9.  **Push to your fork** and [submit a pull request](https://github.com/lilyvanoekel/percupuff/compare) to our `main` branch.

**For small changes** like typos in documentation, you can often use GitHub's web interface to edit a file and propose a change directly.

## How to Report a Bug

**Security Note:** If you find a security vulnerability, **do NOT open a public issue.** Please report it responsibly by creating a **[draft security advisory](https://github.com/lilyvanoekel/percupuff/security/advisories/new)**.

When filing a bug report, please use the 🐞 Bug Report 🐛 issue template and follow the instructions.

## How to Suggest a Feature or Enhancement

Ideas for new features or enhancements are always welcome.

- Please use the ✨ Feature Request ✨ issue template and follow the steps.
- Or, use the 📚 Documentation Update 📚 template if that's more appropriate for your suggestion!

## Asking Questions, Requesting Help, Providing Feedback, Other Suggestions

Feel free to create an issue using the ❓ Question / Help Request / Suggestion ❗ for anything that has you confused, or needs constructive feedback, or otherwise doesn't fit in one of the other categories.

## Code Review Process

After you submit a pull request:

1.  **Automatic Checks:** We may have GitHub Actions set up to run basic checks.
2.  **Maintainer Review:** A project maintainer will review your code. We look for:
    - Correctness: Does the code work as intended?
    - Clarity: Is the code and any new documentation easy to understand? This is key for the educational goal.
    - Safety: Does it break any existing functionality?
3.  **Feedback:** We may suggest changes. Please don't be discouraged by this; it's a normal part of the process!
4.  **Merge:** Once approved, a maintainer will merge your PR.

As a small team, our response time may vary, but we aim to provide initial feedback within a week.

## Project Conventions

- **Parameters:** The source of truth for parameters is `view/src/params.ts`. After modifying it, run `npm run build-params` from the `view` directory and manually paste the output into `dsp/Params.cmajor`.
- **New Drum Sounds:** New drum synthesizers should be added as a `.cmajor` file in the `dsp/drums/` directory. Please reference existing files like `Snare.cmajor` or `Cowbell.cmajor` for the expected structure and comments.
- **Commit Messages:** Please try to write clear, concise commit messages. We don't enforce a strict format, but "Fixed bug" is less helpful than "Fix crackling sound in HiHat by preventing NaN in oscillator phase". (this is a little "do as I say, not as I do" if you look through the commit history, sorry 😅)
