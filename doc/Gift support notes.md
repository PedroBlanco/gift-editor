# Supported questions

## Supported and interpreted

```
// Tipo: fill in the blanks - end
::T1a::Two plus two
equals {=four =4}

// Tipo: fill in the blanks - middle
::T1b::Two plus {=two =2}
equals four.

// Tipo: fill in the blanks - start
::T1c::{=Two =2} plus two
equals four.

// Tipo: matching
::T2:: Which animal eats which food?
{ =cat -> cat food =dog -> dog food }

// Tipo essay
::T3a::Please describe your favourite film
{}

// Tipo: description/instructions (not really a question)
::T3c::In this exam you are not allowed to look through the windows

// Tipo: True/false
::T5::
1+1=2
{T}

// Tipo: math tolerance question
::T6a::What is a number from 1 to 5? {#3:2}

// Tipo: math range question
::T6b::What is a number from 1 to 5? {#1..5}
```


## Partial support (not correctly interpreted)

```
// multiple choice with specified feedback for right and wrong answers
::Q2:: What's between orange and green in the spectrum?
{ =yellow # right; good! ~red # wrong, it's yellow ~blue # wrong, it's yellow }

// multiple numeric answers with partial credit and feedback
::Q7:: When was Ulysses S. Grant born? {#
         =1822:0      # Correct! Full credit.
         =%50%1822:2  # He was born in 1822. Half credit for being close.
}

::Jesus' hometown::Jesus Christ was from {
   ~Jerusalem#This was an important city, but the wrong answer.
   ~%25%Bethlehem#He was born here, but not raised here.
   ~%50%Galilee#You need to be more specific.
   =Nazareth#Yes! That's right!
}

::Jesus' hometown:: Jesus Christ was from {
   =Nazareth#Yes! That's right!
   =%75%Nazereth#Right, but misspelled.
   =%25%Bethlehem#He was born here, but not raised here.
}
```


## Not yet parsed (error)

```
// Tipo: fill in the blanks - multiple
// Is this question even possible?
::T1d:Water molecule is composed by {=1 =one} atom
of Oxygen and {=2 =two} atoms of Hidrogen.
```


# Supported elements

https://docs.moodle.org/27/en/GIFT_format#Format_symbols

## Legend

| Parsed | Not parsed | Depends/Unknown |
|:------:|:----------:|:---------------:|
| :white_check_mark: | :x: | :question: |

## Support

| Supported | Symbols |	Use |
|:---------:| ------- | --- |
| :white_check_mark: |`// text` |	Comment until end of line (optional) |
| :white_check_mark: |`::title::` |	Question title (optional) |
| :white_check_mark: |`text` |	Question text (becomes title if no title specified) |
| :x: |`[...format...]` |	The format of the following bit of text. Options are [html], [moodle], [plain] and [markdown]. The default is [moodle] for the question text, other parts of the question default to the format used for the question text. |
| :white_check_mark: |`{` |	Start answer(s) -- without any answers, text is a description of following questions |
| :white_check_mark: |`{T} or {F}` |	True or False answer; also {TRUE} and {FALSE} |
| :question: |`{ ... =right ... }` |	Correct answer for multiple choice, (multiple answer? -- see page comments) |
| :white_check_mark: |`{ ... =right ... }` |	Correct answer(s) for fill-in-the-blank |
| :question: |`{ ... ~wrong ... }` |	Incorrect answer for multiple choice or multiple answer |
| :white_check_mark: |`{ ... =item -> match ... }` |	Answer for matching questions |
| :x: |`####general feedback` | General feedback |
| :x: |`#feedback text` |	Answer feedback for preceding multiple, fill-in-the-blank, or numeric answers |
| :white_check_mark: |`{#` |	Start numeric answer(s) |
| :white_check_mark: |`answer:tolerance` |	Numeric answer accepted within ± tolerance range |
| :white_check_mark: |`low..high` |	Lower and upper range values of accepted numeric answer |
| :question: |`=%n%answer:tolerance` |	n percent credit for one of multiple numeric ranges within tolerance from answer |
| :white_check_mark: |`}` |	End answer(s) |
| :question: |`\character` |	Backslash escapes the special meaning of ~, =, #, {, }, and : |
| :white_check_mark: |`\n` |	Places a newline in question text -- blank lines delimit questions |
