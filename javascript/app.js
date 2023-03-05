
function FormataData(txtbox)
{
	txtbox.value = txtbox.value.replace(/[^0-9\/]/g, ''); //Apaga caracteres que não fazem parte de uma data.
	
	for (let i = 0 ; i < txtbox.value.length ; i++)
	{
		if (txtbox.value.charAt(i) == '/')
		{
			if ((i != 2) && (i != 5))
			{
				txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1); //Impede o caractere '/' de ser colocado em posições indevidas.
			}
		}
		else
		{
			let digito = txtbox.value.charAt(i) * 1;
		
			if (i == 0)
			{
				if ("0123".indexOf(digito) == -1)
				{
					txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
				}
			}
			else if (i == 1)
			{
				let digitoAnterior = txtbox.value.charAt(i-1) * 1;
				
				if (((10 * digitoAnterior + digito) > 31) || ((10 * digitoAnterior + digito) == 0))
				{
					txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
				}
			}
			else if ((i == 2) || (i == 5))
			{
				if (txtbox.value.charAt(i) != '/')
				{
					txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
				}
			}
			else if (i == 3)
			{
				if ("01".indexOf(digito) == -1)
				{
					txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
				}
			}
			else if (i == 4)
			{
				let digitoAnterior = txtbox.value.charAt(i-1) * 1;
				
				if (((10 * digitoAnterior + digito) > 12) || ((10 * digitoAnterior + digito) == 0))
				{
					txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
				}
				else
				{
					let dia = txtbox.value.substr(0, 2);
					let mes = txtbox.value.substr(3, 2);
					
					if ((dia == '31') && ("|01|03|05|07|08|10|12".indexOf(mes) == -1))
					{
						txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
					}
					else if ((dia == '30') && (mes == '02'))
					{
						txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
					}
				}
			}
			else if (i >= 6)
			{
				let ano = txtbox.value.slice(6) * 1;
				
				if (ano < 1)
				{
					txtbox.value = txtbox.value.substr(0, txtbox.value.length - 1);
				}
			}
		}
	}
}

function VerificaData(txtbox)
{
	if (txtbox.value.length > 6)
	{
		let dia = txtbox.value.substr(0, 2);
		let mes = txtbox.value.substr(3, 2);
		let ano = txtbox.value.slice(6) * 1;
		
		if ((dia == '29') && (mes == '02') && (EhBissexto(ano) == false))
		{
			txtbox.value = '';
		}
	}
	else
	{
		txtbox.value = '';
	}
}

function EhBissexto(ano)
{
	let bissexto = false;

	if (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0))
	{
		bissexto = true;
	}
	
	return bissexto;
}

function validaCNS(cns)
{
	let cnsValido = false;

	if (cns.trim().length == 15) 
	{
		let soma = 0;
		let resto = 0;

		switch (cns.substr(0, 1))
		{
			case '1':
			case '2':
				let pis = cns.substr(0, 11);

				soma = (((pis.substr(0, 1) * 1) * 15) +
						((pis.substr(1, 1) * 1) * 14) +
						((pis.substr(2, 1) * 1) * 13) +
						((pis.substr(3, 1) * 1) * 12) +
						((pis.substr(4, 1) * 1) * 11) +
						((pis.substr(5, 1) * 1) * 10) +
						((pis.substr(6, 1) * 1) * 9) +
						((pis.substr(7, 1) * 1) * 8) +
						((pis.substr(8, 1) * 1) * 7) +
						((pis.substr(9, 1) * 1) * 6) +
						((pis.substr(10, 1) * 1) * 5));
						
				resto = soma % 11;
				let dv = 11 - resto;
				let resultado = 0;
		
				if (dv == 11) 
				{ 
					dv = 0;	
				}

				if (dv == 10) 
				{ 
					soma = ((((pis.substr(0, 1) * 1) * 15) +
							((pis.substr(1, 1) * 1) * 14) +
							((pis.substr(2, 1) * 1) * 13) +
							((pis.substr(3, 1) * 1) * 12) +
							((pis.substr(4, 1) * 1) * 11) +
							((pis.substr(5, 1) * 1) * 10) +
							((pis.substr(6, 1) * 1) * 9) +
							((pis.substr(7, 1) * 1) * 8) +
							((pis.substr(8, 1) * 1) * 7) +
							((pis.substr(9, 1) * 1) * 6) +
							((pis.substr(10, 1) * 1) * 5)) + 2);
							
					resto = soma % 11;
					dv = 11 - resto;
					resultado = pis + "001" + dv;
				}
				else 
				{
					resultado = pis + "000" + dv;
				}
		
				if (cns == resultado)
				{
					cnsValido = true;
				}

				break;
			case '7':
			case '8':
			case '9':
				soma = (((cns.substr(0, 1)) * 15) +
						((cns.substr(1, 1)) * 14) +
						((cns.substr(2, 1)) * 13) +
						((cns.substr(3, 1)) * 12) +
						((cns.substr(4, 1)) * 11) +
						((cns.substr(5, 1)) * 10) +
						((cns.substr(6, 1)) * 9) +
						((cns.substr(7, 1)) * 8) +
						((cns.substr(8, 1)) * 7) +
						((cns.substr(9, 1)) * 6) +
						((cns.substr(10, 1)) * 5) +
						((cns.substr(11, 1)) * 4) +
						((cns.substr(12, 1)) * 3) +
						((cns.substr(13, 1)) * 2) +
						((cns.substr(14, 1)) * 1));

				resto = soma % 11;
				console.log(resto);
				
				if (resto == 0)
				{
					cnsValido = true;
				}
				
				break;
		}
	}

	return cnsValido;
}

function validaCPF(cpf)
{
	if (cpf.length != 11)
	{
		return false;
	}
	else
	{
		var s = 0;

		for (var i = 1 ; i < cpf.length ; i++)
		{
			if (cpf.charAt(0) == cpf.charAt(i))
			{
				s = s + 1;
			}
		}

		if (s == 10)
		{
			return false;
		}
		else
		{
			var num = 2;
			var inicio = 10;

			for (var t = 1 ; t <= 2 ; t++)
			{
				var soma = 0;

				for (var n = 0 ; n < (cpf.length - num) ; n++)
				{
					soma = soma + (cpf.charAt(n) * inicio);				
					inicio = inicio - 1;
				}

				var resto = (soma * 10) % 11;

				if (resto == 10)
				{
					resto = 0;
				}

				if (resto - parseInt(cpf.charAt(cpf.length - num)) == 0)
				{
					num = 1;
					inicio = 11;
				}
				else
				{
					return false;
				}
			}
		}
	}

	return true;
}

function Maiusculo(txtbox)
{
	txtbox.value = txtbox.value.toUpperCase();
}

function Numerico(txtbox)
{
	var cnes = txtbox.value;
	var numeros = /[^0-9]/mi;
	var res = cnes.match(numeros);
	txtbox.value = cnes.replace(res,"");
}

function FormataCep(txtbox)
{
	var txtValor = txtbox.value;
	var numeros = /[^0-9|-]/mi;
	var res = txtValor.match(numeros);
	txtbox.value = txtValor.replace(res,"");

	var tam = txtbox.value.length;

	if (tam == 5)
	{
		txtbox.value = txtbox.value + '-';
	}

	if ((txtbox.value.lastIndexOf('-') > -1) &&  (txtbox.value.lastIndexOf('-') != 5))
	{
		txtbox.value = '';
	}
}