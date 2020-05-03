#!/bin/bash

loadTestingDir=reports/load-testing
currentDate+="$(date +%H%M%S_)"
currentDate+="$(date +%d_%m_%Y)"
reportName="$currentDate"
reportName+=.json
reportLocation="${loadTestingDir}/${reportName}"

mkdir -p "${loadTestingDir}"

echo "Report will be saved in ${reportLocation}"
artillery run load-testing/* -o "${reportLocation}" # generateReportJson
artillery report "${reportLocation}" -o "${loadTestingDir}/${currentDate}.html" # generateReportHtml
chmod +w "${reportLocation}" # givePermissions
rm "${reportLocation}" # deleteJsonOutput
