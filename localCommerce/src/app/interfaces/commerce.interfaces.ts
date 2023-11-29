export interface CommerceInterface {
    name:     string,
    desc:     string,
    location: string,
    lat:      number,
    long:     number,
    type:     string,
    owner:    string,
    offer?:    string
};

export interface CoordsInterface {
    lat: number,
    lon: number
};
