$path = "C:\Users\imsam\.gemini\antigravity\brain\58874acd-78fb-4083-849b-0e5e078a765c\.system_generated\logs\transcript_full.jsonl"
$reader = [System.IO.File]::OpenText($path)
$lineNum = 0
while ($null -ne ($line = $reader.ReadLine())) {
    $lineNum++
    if ($line.IndexOf("var artworks =") -ge 0) {
        Write-Host "Found 'var artworks =' at line $lineNum (Length: $($line.Length))"
        $json = ConvertFrom-Json $line
        # Look in content, tool_calls, etc.
        if ($json.tool_calls) {
            foreach ($tc in $json.tool_calls) {
                Write-Host "  tool_call: $($tc.name)"
                if ($tc.args.CodeContent) {
                    Write-Host "  CodeContent length: $($tc.args.CodeContent.Length)"
                    [System.IO.File]::WriteAllText("d:\Downloads - D\museum of us\script_recovered_$lineNum.js", $tc.args.CodeContent)
                }
            }
        }
        if ($json.content) {
            Write-Host "  content length: $($json.content.Length)"
            if ($json.content.IndexOf("var artworks =") -ge 0) {
                [System.IO.File]::WriteAllText("d:\Downloads - D\museum of us\content_$lineNum.txt", $json.content)
            }
        }
    }
}
$reader.Close()
