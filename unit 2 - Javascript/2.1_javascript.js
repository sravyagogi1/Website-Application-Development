// 1
function string_sum(str) {
    return Array.from(str).reduce((sum, char) => {
        const num = parseInt(char, 10);

        if (isNaN(num)) {
            return sum;
        } else {
            return sum + num;
        }

    }, 0);
}

// 2
function keep_evens(arr) {
    return arr.filter(function(num) {
        return num % 2 === 0;
    });
}

// 3
const people = [
    { 'name': 'Paul', 'age': 60 },
    { 'name': 'Sue', 'age': 40 },
    { 'name': 'Frank', 'age': 70 },
    { 'name': 'Mom', 'age': 90 }
];

const over40 = people.filter(function(person) {
    return person.age > 40;
});

// 4
function find_max(arr) {
    let max = arr[0];

    for (let num of arr) {
        if (num > max) {
            max = num;
        }
    }
    return max;
}

// 5
function find_max_min(arr) {
    let max = arr[0];
    let min = arr[0];

    for (let num of arr) {
        if (num > max) {
            max = num;
        }
        if (num < min) {
            min = num;
        }
    }
    return { 'max': max, 'min': min };
}

// 6
function sum_double(arr) {
    let sum = 0;

    for (let num of arr) {
        sum += num;
    }
    return sum * 2;
}

// 7
function sum_double_evens(arr) {
    let sum = 0;

    for (let num of arr) {
        if (num % 2 === 0) {
            sum += num;
        }
    }
    return sum * 2;
}

// 8
function capitalize_firsts(str) {
    const words = str.split(' ');
    let result = [];

    for (let word of words) {
        let capitalized = word.charAt(0).toUpperCase() + word.slice(1);
        result.push(capitalized);
    }
    return result.join(' ');
}

// 9
function longest_word(str) {
    const words = str.split('.').join(' ').split(' ').filter(function(w){
        return w.length > 0;
    });

    let longest = "";

    for (let word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}

// 10
function longest_shortest_word(str) {
    const words = str.split('.').join(' ').split(' ').filter(function(w){
        return w.length > 0;
    });

    if (words.length === 0) {
        return { 'longest': '', 'shortest': '' };
    }

    let longest = words[0];
    let shortest = words[0];

    for (let word of words) {
        if (word.length > longest.length) longest = word;
        if (word.length < shortest.length) shortest = word;
    }
    return {'longest': longest, 'shortest': shortest};
}

// 11
function digits_only(str) {
    return Array.from(str)
        .filter(function(char){
            return char >= '0' && char <= '9';
        })
        .map(function(char){
            return Number(char);
        });
}

// 12
function add(a,b) {
    return a + b;
}

// 13
function makes10(a,b) {
    if (a === 10 || b === 10 || a + b === 10) {
        return true;
    } else {
        return false;
    }
}

// 14
const person = {name:'Sravya', school:'TJ', year:2027};
const school = person.school;
const year = person.year;

// 15
function complimentCats(name,numCats) {
    return "Hello, " + name + ". Did you know I have " + numCats + " cats. It's a whole vibe.";
}