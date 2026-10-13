//1
function caeserCipher(messsage,shift) {
	let result = "";
    const normalizedShift = ((shift % 26) + 26) % 26;

    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        
        if (char.match(/[a-z]/i)) {
            const code = message.charCodeAt(i);
            let base = (code >= 65 && code <= 90) ? 65 : 97;
            
            char = String.fromCharCode(((code-base+normalizedShift) % 26) + base);
        }
        
        result += char;
    }
    return result;
}


//2
function ceasarDecode(message,shift){
	return caesarCipher(message, -shift);
}

//3
function generateCipher {
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const shuffled = [...alphabet];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const cipherMap = {};
    alphabet.forEach((letter,index) => {
        cipherMap[letter] = shuffled[index];
    });
    
    return cipherMap;
}

//4
function substitutionCipher(message,cipherMap) {
    let result = "";
    
    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        const lowerChar = char.toLowerCase();
        
        if (cipherMap[lowerChar]) {
            const mappedChar = cipherMap[lowerChar];
            result += (char === char.toUpperCase()) ? mappedChar.toUpperCase() : mappedChar;
        } else {
            result += char;
        }
    }
    return result;
}

//5
function substitutionDecode(message,cipherMap) {
    const reverseMap = {};
    for (let key in cipherMap) {
        reverseMap[cipherMap[key]] = key;
    }
    
    return substitutionCipher(message,reverseMap);
}