// Flattening function
function flatten(arr){
	return arr.reduce(function(cur,next){
		return cur.concat(next);
	});
}
var arr = [[2, 4, 6], [8], [10, 12]];
console.log(flatten(arr));

// every function
function every(arr,check){
	arr.forEach(function(element){
		if(!check(element)){
			return false;
		}
	});
	return true;
}
function divisible(element){
	if(element%3===0){
		return true;
	}else{
		return false;
	}
}
var arr = [9, 48, 204, 528942];
console.log("Running every...");
console.log(every(arr,divisible));

// some function
function some(arr,check){
	arr.forEach(function(element){
		if(check(element)){
			return true;
		}
	});
	return false;
}
function length(element){
	if(element.length===9){
		return true;
	}else{
		return false;
	}
}
var arr = ['aardvark', 'abbreviate', 'abacuses', 'abandoners', 'abalones'];
console.log("Running some...");
console.log(some(arr,divisible));

