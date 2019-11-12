// ADD NEW ITEM TO END OF LIST
var node_list = document.getElementById('page').getElementsByTagName('ul')[0];
var last_node = document.createElement('li');
var last_node_text = document.createTextNode('cream');
last_node.appendChild(last_node_text);
node_list.appendChild(last_node);

// ADD NEW ITEM START OF LIST
var first_node = document.createElement('li');
var first_node_text = document.createTextNode('kale');
first_node.appendChild(first_node_text);
node_list.prepend(first_node);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var element_list = document.querySelectorAll('li');

for(var i = 0; i < element_list.length; i++)
{
    element_list[i].className += "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
document.getElementsByTagName('h2')[0].innerText = "Buy Groceries: " + element_list.length;