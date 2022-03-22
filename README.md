# formine.js 📑
The JavaScript component of Formine (Renderer and (Soon) Builder)

A lightweight but featureful form-renderer, supporting conditional logic, easy serialisation and a simple developer interface.

## Typical Usage:

A typical formine deployment would be as follows, simply include a target element and use the static `render` function to render formine to this.
The second argument of the `render` function allows us to define the schema, initial submission values and any hooks.

```html
<div id="formine"></div>
<script defer>
  let formine = Formine.render(document.getElementById('formine'), {
    values : {
      'text-field' : 'hello',
      'mygroup' : {
        'text-field-nested' : 'Nested value'
      }
    },
    schema: {
      components: [
        {
          type : "group",
          uid : 'mygroup',   
          components: [
            {
              type: "text",
              uid: "text-field-nested",
              attributes: {
                placeholder: "Test",
              }
            }
          ]
        },
        {
          type: "text",
          uid: "text-field",
          attributes: {
            placeholder : "Test",
          }
        }
      ]
    }
  });
</script>
```
### Supported Components
* text
* button
* date
* datetime
* email
* checkbox
* checkbox fieldset
* group
* number
* password
* tel
* textarea
* url
* select (coming soon)

### Conditional logic

The `display` property of each component allows us to define conditions. Eventually a full and clear API will be available once the conditional rendering syntax is stable. The conditional rendering system is much more powerful than represented below, take a look at the condition rendering reducer to gain better understanding.

#### Example 1
Here, this text-field will only display once text-field's value `==` "hello".
```js
{
  type: "text",
  uid: "text-field2",
  display: {
    conditions: [
      {
        op: "==",
        value: "hello",
        path: "text-field"
      }
    ]
  }
}
```
#### Example 2
Similar to Example 1, but conditions can be nested and will be executed recursively to determine whether to display or not.
```js
{
  type: "text",
  uid: "text-field2",
  display: {
    conditions: [
      {
        op: "==",
        value: "hello",
        path: "text-field"
      },
      {
        op: "!=",
        value: "goodbye",
        path: "text-field4"
      },
    ]
  }
}
```
#### Example 3
Functions can also be used as conditions:
```js
{
  type: "text",
  uid: "text-field2",
  display: {
    conditions: [
      (submission) => true
    ]
  }
}
```
#### Example 4
To support serialisation, string functions are allowed as conditions:
```js
{
  type: "text",
  uid: "text-field2",
  display: {
    conditions: [
      "function(submission){ return true }"
    ]
  }
}
```

## Contribution Guide:

### Quickstart

* Clone this repository locally
* Run `npm install` and then `npm run build`, or `npm run watch` for instant recompiling.
* Include the `/dist/cdn.js` file from a `<script>` tag on a webpage and you've now got access to the static interface!
* Ensure your build passes all tests with `npm run test`
