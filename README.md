# node-json-config
Read and Write configurations to JSON file.

# How to use

## initialize

Create Config instance with JSON path.
Configurations are automatically loaded from the JSON file.

```
var conf = new Config("./config.json");
```

## Read configuration

You can access configurations using dot notation.

Here is sample JSON.

```
{
  "one": 1,
  "a": {
    "b": {
	  "c": "ABC"
	}
  }
}
```

```
conf.get("one")    // 1
conf.get("a.b.c")  // "ABC"
```

## Write configuration

Also you can put new configuration using dot notation.

```
{
  "one": 1,
  "a": {
    "b": {
	  "c": "ABC"
	}
  }
}
```

```
conf.put("two", 2);
conf.put("x.y.z", "XYZ");
```

```
{
  "one": 1,
  "a": {
    "b": {
	  "c": "ABC"
	}
  },
  "two": 2,
  "x": {
    "y": {
	  "z": "XYZ"
	}
  }
}
```

## Save configurations

```
conf.save();
```
