
var lengthOfLongestSubstringA = function(s) {
  let maxlen = 0;//let maxLen = 0;
  let start =0,end = 0;//let start = 0, end = 0;
  for(; end< s.length; end++){//for (; end < s.length; end++) {
    let index = s.substring(start, end).indexOf(s.charAt(end));
    //let indexOf = s.substring(start, end).indexOf(s.charAt(end));
    if(index != -1){
      maxlen = Math.max(maxlen,end-start);
      start += index+1
    }
  }
  console.log(Math.max(maxlen, end - start));
  return Math.max(maxlen, end - start);
};

var lengthOfLongestSubstringB = function(s) {
  let maxLen = 0;
  let start = 0, end = 0;
  for (; end < s.length; end++) {
    let indexOf = s.substring(start, end).indexOf(s.charAt(end));
    if (indexOf != -1) {
      maxLen = Math.max(maxLen, end - start);
      start += indexOf + 1;
    }
  }
  console.log(Math.max(maxLen, end - start));
  return Math.max(maxLen, end - start);
};

//lengthOfLongestSubstringA("abcabcbb");
//lengthOfLongestSubstringB("abcabcbb");

//4.寻找两个有序数组的中位数
var findMedianSortedArrays = function(nums1, nums2) {

  for (let i=0;i<nums2.length;i++){
    nums1.push(nums2[i]);
  }
  let nums3 = nums1.sort((a,b)=>{
    return b-a
  });
  let length = nums1.length;
  if(length % 2 == 0){
    let indexA = (length / 2) - 1;
    let indexB = (length / 2 );
    return ((nums3[indexA] +nums3[indexB]) /2 )
  }else{
    let index = (length-1) /2;

    return (nums3[index])
  }
};
//findMedianSortedArrays([3],[-1,-2]);

/*function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3)
};
var getName = function () {
  console.log(4)
};
function getName() {
  console.log(5)
};
Foo.getName();//2
getName();//4
Foo().getName();//1
getName();//5  其实该是1
new Foo().getName();//3*/

//ES5和ES6数组去重方法
function fun(arr) {
  var brr = [];
  var obj = {};
  for (var i=0;i<arr.length;i++){
    if (!obj[arr[i]]){
      obj[arr[i]] = true;
      brr.push(arr[i]);
    }
  }
  console.log(brr)
}
arr = [5,'5',1,'1',4,2];
fun(arr);
function fun1(arr) {

}
