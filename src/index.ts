import * as memmap from "./map.json"

export interface AddressInfo {
    brief: string | undefined,
    ctx: string | undefined,
    desc: string,
    label: string | undefined,
    note: string | undefined,
    subctx: string | undefined,
    type: string
}

export function get_all(): Map<string, AddressInfo> {
    let m = new Map<string, AddressInfo>();
    for (const [key, obj] of Object.entries(memmap)) {
        m.set(key, {
            brief: 'brief' in obj ? obj.brief : undefined,
            ctx: 'ctx' in obj ? obj.ctx : undefined,
            desc: obj.desc,
            label: 'label' in obj ? obj.label : undefined,
            note: 'note' in obj ? obj.note : undefined,
            subctx: 'subctx' in obj ? obj.subctx : undefined,
            type: obj.type
        });
    }
    return m;
}

export function get_one(addr: number): AddressInfo | undefined {
    let pos_addr = addr < 0 ? addr + 2 ** 16 : addr;
    const hex = '0x' + pos_addr.toString(16).padStart(4, '0');
    return Object(memmap)[hex];
}
