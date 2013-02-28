### lib.classList(element)

#### Parameters
-  `element` *HTMLElement* 


Return a ClassList for an element.  ClassList is not an
Element#classList polyfil, but an extension thereof.



#### Returns
_ClassList_ An instance of ClassList specific to the provided HTMLElement

### ClassList#add(name)

#### Parameters
-  `name` *String* 


Add a class to the element if not already present



#### Returns
_ClassList_ 

### ClassList#remove(name)

#### Parameters
-  `name` *String* 


Remove a class from the element



#### Returns
_ClassList_ 

### ClassList#replace(oldClass, newClass)

#### Parameters
-  `oldClass` *String* 
-  `newClass` *String* 


Replace a specific class from the element with another.  If the class to be replaced is no present, the replacement class will be added.



#### Returns
_ClassList_ 

### ClassList#toggle(name)

#### Parameters
-  `name` *String* 


Toggle a class of the element



#### Returns
_ClassList_ 

### ClassList#toArray()



Return an array of classes attached to the element



#### Returns
_Array_ 

### ClassList#contains(name)

#### Parameters
-  `name` *String* 


Check if the element has the class



#### Returns
_Boolean_ 

### ClassList#toString()



Return a String representation of the element's ClassList



#### Returns
_String_ 

