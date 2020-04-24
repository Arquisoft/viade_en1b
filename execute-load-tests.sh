#!/bin/bash

loadTestingDir=reports/load-testing
currentDate+=`date +%H%M%S_`
currentDate+=`date +%d_%m_%Y`
reportName=$currentDate
reportName+=.json
reportLocation=${loadTestingDir}/${reportName}

mkdir -p ${loadTestingDir}

echo "Report will be saved in ${reportLocation}"
generateReportJson="artillery run load-testing/* -o ${reportLocation}"
generateReportHtml="artillery report ${reportLocation} -o ${loadTestingDir}/${currentDate}.html"
givePermissions="chmod +w ${reportLocation}"
deleteJsonOutput="rm ${reportLocation}"

eval $generateReportJson
eval $generateReportHtml
eval $givePermissions
eval $deleteJsonOutput