# Lab Map

Create layouts of computer labs and provide `ps` and `who` outputs to find out which computers are being used! `ps` output will be used to create the `Board of Shame` where users with multiple `:x` or `tty` sessions can be highlighted.

## Data File Format (JSON)

```json
{
 "who": {
  "<computer name>": [rows of who output]
 },
 "ps": {
  "<computer name>": [rows of ps aux output]
 }
}
```
