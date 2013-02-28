### lib.indexOf(array, needle, fromIndex)

#### Parameters
-  `array` *Array* 
-  `needle` *Mixed|Any* 
-  `fromIndex` *Number* 


Get the index of an item in an Array

#### Example Usage

```
lib.indexOf(['hello', 'world'], 'world') === 1
// => true
```

```
lib.indexOf(['hello', 'world'], 'goodbye') === -1
// => true
```


#### Returns
_Number_ 

### lib.isArray(candidate)

#### Parameters
-  `candidate` *Mixed|Any* 


Check if something is an Array

#### Example Usage

```
lib.isArray('foo')
// => false
```

```
lib.isArray(['foo'])
// => true
```

```
lib.isArray(document.getElementsByTagName('*'))
// => false
```


#### Returns
_Boolean_ 

### lib.inArray(array, needle, fromIndex)

#### Parameters
-  `array` *Array* 
-  `needle` *Mixed|Any* 
-  `fromIndex` *Number* 


Check if an item is contained within an Array

#### Example Usage

```
lib.inArray(['hello', 'world'], 'world') === 1
// => true
```

```
lib.inArray(['hello', 'world'], 'goodbye')
// => false
```


#### Returns
_Boolean_ 

### lib.toArray(list)

#### Parameters
-  `list` *Object* The list (Object with length)


Handles coherion from a list to an Array

#### Example Usage

```
lib.toArray(document.getElementsByTagName('*'))
```


#### Returns
_Array_ 

