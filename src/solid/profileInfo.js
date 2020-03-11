
import data from '@solid/query-ldflex' ;


export async function getEmail(theEmail){

	try{
		const  emailsId = await data.user[ 'http://www.w3.org/2006/vcard/ns#hasEmail' ].value ;	
		const firstEmail = await data[emailsId].vcard_value.value; 
		const emailParsed = firstEmail.split(":")
		emailParsed.shift(); 
		return  emailParsed.join(":")
	} catch (err)
	{
		return "No email"; 
	}

}
