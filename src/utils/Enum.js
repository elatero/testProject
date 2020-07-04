/*
    @inputs Object
    {
      NAME1: { value: [number], description: [string] },
      NAME2: { value: [number], description: [string] }
    }

    @methods:
        descriptionOf( value:Number | key:String ) - getting field description
        nameOf( value:Number )                     - getting field name
        values()                                   - getting all field values
        valueOf( key:String )                      - getting field value

    @examples:
        var enum = new Enum({
            STRING: {
                value: 1,
                description: "This is String"
            },
            INT: {
                value: 2,
                description: "This is Number"
            },
            CHAR: {
                value: 3,
                description: "This is Character"
            }
        })

        enum.STRING     //-> 1
        enum.INT        //-> 2
        enum.CHAR       //-> 3

        enum.descriptionOf("STRING")    //-> This is String
        enum.descriptionOf("INT")       //-> This is Number
        enum.descriptionOf("CHAR")      //-> This is Character
        enum.nameOf(1)              //-> STRING
        enum.nameOf(2)              //-> INT
        enum.nameOf(3)              //-> CHAR

        enum.values()   //-> [1, 2, 3]
        enum.names()    //-> ["STRING", "INT", "CHAR"]

        enum.valueOf("STRING") //-> 1
*/

export default class Enum {
  constructor(obj) {
    const that = this
    this.__obj = obj

    Object.keys(obj).forEach(function (item, index) {
      Object.defineProperty(that, item, {
        get: function () {
          return this.__obj[item].value
        },
      })
    })

    this.getDescription = function (value) {
      return this.__obj[value].description
    }

    this.values = function () {
      return Object.keys(this.__obj).map((key) => this.__obj[key].value)
    }

    this.names = function () {
      return Object.keys(this.__obj)
    }

    this.valueOf = function (key) {
      if (this.__obj[key]) {
        return this.__obj[key].value
      }
      return undefined
    }

    this.nameOf = function (value) {
      return Object.keys(this.__obj).filter((key) => this.__obj[key].value == value)[0]
    }

    this.descriptionOf = function (value) {
      if (typeof value === 'number') {
        return this.__obj[Object.keys(this.__obj).filter((key) => this.__obj[key].value == value)[0]].description
      }
      if (typeof value === 'string') {
        return this.__obj[value].description
      }
    }
  }
}
