# Supported questions

##Supported and interpreted


##Partial support (not correctly interpreted)

```
// Tipo: fill in the blanks - middle
::T1b::Two plus {=two =2}
equals four.
```
> Question has to be divided in 2 strings

##Not yet parsed (error)

```
// Tipo: fill in the blanks - multiple
::T1d:Water molecule is composed by {=1 =one} atom of Oxygen and {=2 =two} atoms of Hidrogen.
```
> Is this question even possible?


# Supported elements

https://docs.moodle.org/27/en/GIFT_format#Format_symbols

:white_check_mark:
:x:
:question:

| Supported | Symbols |	Use |
|:---------:| ------- | --- |
| :white_check_mark: |`// text` |	Comment until end of line (optional) |
| :white_check_mark: |`::title::` |	Question title (optional) |
| :white_check_mark: |`text` |	Question text (becomes title if no title specified) |
| :x: |`[...format...]` |	The format of the following bit of text. Options are [html], [moodle], [plain] and [markdown]. The default is [moodle] for the question text, other parts of the question default to the format used for the question text. |
| :white_check_mark: |`{` |	Start answer(s) -- without any answers, text is a description of following questions |
| :white_check_mark: |`{T} or {F}` |	True or False answer; also {TRUE} and {FALSE} |
| :question: |`{ ... =right ... }` |	Correct answer for multiple choice, (multiple answer? -- see page comments) or fill-in-the-blank |
| :question: |`{ ... ~wrong ... }` |	Incorrect answer for multiple choice or multiple answer |
| :question: |`{ ... =item -> match ... }` |	Answer for matching questions |
| :x: |`####general feedback` | General feedback |
| :x: |`#feedback text` |	Answer feedback for preceding multiple, fill-in-the-blank, or numeric answers |
| :white_check_mark: |`{#` |	Start numeric answer(s) |
| :white_check_mark: |`answer:tolerance` |	Numeric answer accepted within ± tolerance range |
| :white_check_mark: |`low..high` |	Lower and upper range values of accepted numeric answer |
| :question: |`=%n%answer:tolerance` |	n percent credit for one of multiple numeric ranges within tolerance from answer |
| :white_check_mark: |`}` |	End answer(s) |
| :question: |`\character` |	Backslash escapes the special meaning of ~, =, #, {, }, and : |
| :white_check_mark: |`\n` |	Places a newline in question text -- blank lines delimit questions |
