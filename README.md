# Apple II Memory Map

This is a database of Apple II special addresses intended to be used with language servers.  The central element is the file `map.json` which maps addresses to a set of descriptive strings.

## TypeScript Interface

The project includes a Node package that can be used to access the data.  The map records correspond to the interface

```ts
interface AddressInfo {
    brief: string | undefined,
    ctx: string | undefined,
    desc: string,
    label: string | undefined,
    note: string | undefined,
    subctx: string | undefined,
    type: string
}
```

Records are retrieved using

```ts
get_all() : Map<string,AddressInfo>
```

to get the whole database as a `Map`, or

```ts
get_one(addr: number): AddressInfo | undefined
```

to get a single record.  The argument `addr` can range from -32767 to 65535.  As an example `get_info(0xfded)` will give

```js
{
  brief: 'Print character in A',
  desc: 'Invoke output routine whose address is in (56).  Usually prints character in A.',
  label: 'COUT',
  type: 'ROM routine'
}
```

## AddressInfo Fields

* `brief`: short description suitable for display in a selection box
* `ctx`: notes on limiting context, such as hardware requirements, applicability to given language, etc.
* `desc`: long description suitable for hovers
* `label`: suggested assembler label
* `note`: any other notes
* `subctx`: notes on sub context, e.g., specific aspect of a language
* `type`: data type (e.g. `word`) or operation type (e.g. `ROM routine`, `soft switch`)

## Multiple Context Addresses

If the address has multiple contexts, the fields are still strings, i.e., they are not promoted to any other structure such as a list. As an example, if the address has a meaning for both Applesoft and Integer BASIC, we use `ctx = "Applesoft | Integer BASIC"`.

## References

Apple's own documentation is a good starting point.  The "Apple IIe Reference Manual" has low level information.  The "Applesoft BASIC Programmer's Reference Manual" provides a chapter "Pokes, Peeks, and Calls" with information especially useful to BASIC programmers.

"All About Applesoft" from [Call-A.P.P.L.E.](https://www.callapple.org/) has a more in depth treatment.

Sometimes an ambiguity is best resolved by studying the relevant disassembly.