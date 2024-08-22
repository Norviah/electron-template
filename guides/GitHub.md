### 💬 Commits

Before committing your changes, please make sure that your code is properly
formatted by running prettier with `pnpm run prettier:fix`. If any formatting
issues are found, please fix them before committing your changes.

#### 📢 Commit Messages

When creating a commit, please use the [conventional commit
format](https://www.conventionalcommits.org/en/v1.0.0/#summary) when writing the
commit message. This format is a specification for writing standardized commit
messages by following a format to convey the changes made within the commit.

The format is as follows:

```
<type>([scope]): <description>

[body]

[footer(s)]
```

Each part of the format has a specific purpose to represent the changes made.

  - `type` (required): Represents the type of change that was made, this value
    should be a noun to describe the change. There are no strict list of types
    to choose from, you can use any string you feel is best, but there are some
    common types that are used:

    `feat` for a new feature, `fix` for a bug fix, `docs` for documentation
    changes, `refactor` for changes to the formatting of the code (whitespace,
    semicolons, etc.), `style` for changes to the styling of the code (colors,
    fonts, etc)
  
  - `scope` (optional): AN optional value you can specify to further categorize
    the change, often being the section of the codebase that was changed.

  - `description` (required): A short description of the change, written in the
    imperative mood, meaning that it should be written as if you're giving a
    command. For example, "Add a new feature" instead of "Added a new feature".
  
  - `body` (optional): A longer description of the change, written in the
    imperative mood as well. 

  - `footer` (optional): A footer section that can be used to reference issues or
    pull requests that are associated with the commit, each footer must be on a
    newline and must consist of a word followed by either `:[space]` or
    `[space]#`, followed by a string value.

There are two main benefits to using this format: readability and automation.
Following this structure makes commit messages easily convey the goal of the
respective commit, making it easier for everyone (including your future self) to
understand the changes made and where they made. The format also brings
consistency to the commit messages, allowing for other functionality, such as
automation.

Beyong clarifying the changes made, the format allows tools to built something
on top of commit messages, most notably, changelogs. The consistent commit
history allows tools to read and generate changelogs, as an example, the
[changelog for this
project](https://github.com/Norviah/electron-template/blob/master/CHANGELOG.md) is
generated from the commit history.

Please visit
[here](https://gist.github.com/levibostian/71afa00ddc69688afebb215faab48fd7) for
more information and examples.

#### 🛠 Make Small Commits

When writing a commit message using the conventional format, you need to give a
noun for the `type` of change that was made. This may be: `feat`, `fix`, `docs`,
or something else.

The issue being: what do you do if your commit is large? You were productive and
worked on your changes for the whole day, writing a lot of code, you added new
features, fixed bugs, etc. What `type` would you give for this?

If you find yourself in this situation, it means you made a mistake. Instead of
making a single large commit, make multiple small commits. A commit should do
one thing: whether it be adding a new component, change a simple configuration
value, fixing a bug, etc.

Making small commits not only helps in maintaining a clean and understandable
commit history, but it also facilitates easier code reviews. When changes are
broken down into smaller, logical parts, it's easier for reviewers to understand
the changes and provide meaningful feedback. 

Each commit should be a self-contained unit of change. This doesn't mean
every commit should be tiny, for example, renaming a widely used variable
throughout a large codebase might involve changes to hundreds of files, but it's
a single conceptual change so it should be a single commit.

&nbsp;

### 🤝 Pull Requests

Do **not** push directly to the main branch, always create a branch off of main
and push your changes to that branch. Keep pushing your changes to that branch
until you're finished on whatever you're working on, once you're finished,
create a pull-request to merge your branch into main.

When creating a pull-request, please assign someone to review your code,
preferably not me and someone who worked with you on the code (if any). If the
reviewer signed off on your changes, you can merge the pull-request into main.

If you are assigned to review a pull-request, please take care of it within 24
hours. If you can't take care of it within 48 hours, please let the person who
submitted the pull-request know. If someone hasn't completed their review within
24 hours, you should reassign another member of the team to review the
pull-request, with me as the last resort.

If you don't approve a pull-request, please give reasons for doing so. "No" is
never more helpful than "No, because...".

&nbsp;

### 🌲 Branches

When creating a branch, please use the naming scheme: `[type]-[issue
number]/[shortened issue title]`.

  - `[type]` should represent the type of thing you're working on, for example,
    `feat` for a new feature, `fix` for a bug fix, etc.
  
  - `[issue number]` should be the number of the issue you're working on.

  - `[shortened issue title]` should be a shortened version of the issue title,
    with each word being separated by a hyphen. If the issue title is already
    short enough, you can use the full title.

For example, if you're working on issue #1, with the goal of adding a sign up
page, you can name your branch `feat-1/sign-up-page`. If you're working on issue
#2, which is to fix a bug with the sign up page, you can name your branch
`fix-2/cannot-sign-up`.

&nbsp;
