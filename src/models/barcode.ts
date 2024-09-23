export class BarcodeType {
    constructor(json: any, id: string, name: string, value: string, format: string) {
        this.json = json;
        this.id = id;
        this.name = name;
        this.value = value;
        this.format = format;
    }

    json: any;
    id: string;
    name: string;
    value: string;
    format: string;

    static fromJSON(json: any): BarcodeType {
        return new BarcodeType(
            json,
            json['id'],
            json['name'],
            json['value'],
            json['format'],
        )
    }
}