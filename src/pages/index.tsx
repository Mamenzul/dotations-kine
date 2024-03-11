import Map from "@/components/Map/Map";
import { Shell } from "@/components/shells/shell";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import villes from "@/components/jsons/villes.json";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import zrr from "@/components/jsons/zones-de-revitalisation-rurale-zrr.json";
import { GeoJSONProps } from "react-leaflet";
import { Checkbox } from "@/components/ui/checkbox";
const DEFAULT_CENTER = [46.228245, 2.1895145];

export default function HomePage() {
  const ZRR = zrr as GeoJSONProps["data"];
  const container = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (container.current) {
      setHeight(container.current.offsetHeight);
      setWidth(container.current.offsetWidth);
    }
  }, [container]);
  const [displayZRR, setDisplayZRR] = useState(false);
  const [id, setId] = useState("1");
  const filteredVilles = villes.filter((ville) => ville.z === id);
  return (
    <Shell className="h-full">
      <div ref={container} className="relative h-full w-full">
        <Map
          className="z-0 h-[90%] w-full"
          width={width}
          height={height}
          center={DEFAULT_CENTER}
          zoom={6}
        >
          {/*//@ts-expect-error flemme d'ajouter les types*/}
          {({ TileLayer, Marker, Popup, GeoJSON }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredVilles.map((ville, index) => (
                <Marker position={[ville.la, ville.lo]} key={ville.cc + index}>
                  <Popup>{ville.cc}</Popup>
                </Marker>
              ))}
              {displayZRR && (
                <GeoJSON
                  attribution="&copy; credits due..."
                  data={ZRR}
                ></GeoJSON>
              )}
            </>
          )}
        </Map>
        <div className="absolute left-0 top-0 z-10 w-full p-4 pl-20">
          <RadioGroup
            className=" flex h-fit flex-col items-end justify-between pb-2 md:flex-row"
            defaultValue="1"
            onValueChange={(e) => setId(e)}
          >
            <div className="flex items-center space-x-2 rounded-full bg-white p-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="1">Zone très sous dotée</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-white p-2">
              <RadioGroupItem value="2" id="2" />
              <Label htmlFor="2">Zone sous dotée</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-white p-2">
              <RadioGroupItem value="4" id="4" />
              <Label htmlFor="4">Zone sur dotée</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-white p-2">
              <RadioGroupItem value="5" id="5" />
              <Label htmlFor="5">Zone très sur dotée</Label>
            </div>
          </RadioGroup>
          <div className="flex h-fit flex-col items-end ">
            <div className="flex  items-end space-x-2 rounded-full bg-white p-2">
              <Checkbox
                id="zrr"
                onCheckedChange={(e: boolean) => setDisplayZRR(e)}
              />
              <Label htmlFor="zrr">Afficher les ZRR</Label>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
