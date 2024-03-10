import Map from "@/components/Map/Map";
import { Shell } from "@/components/shells/shell";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import villes from "@/components/jsons/villes.json";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const DEFAULT_CENTER = [46.228245, 2.1895145];

export default function HomePage() {
  const [id, setId] = useState("1");
  const filteredVilles = villes.filter((ville) => ville.z === id);
  return (
    <Shell>
      <RadioGroup
        className="flex h-fit flex-col justify-between md:flex-row"
        defaultValue="1"
        onValueChange={(e) => setId(e)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id="1" />
          <Label htmlFor="1">Zone très sous dotée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="2" id="2" />
          <Label htmlFor="2">Zone sous dotée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="4" id="4" />
          <Label htmlFor="4">Zone sur dotée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="5" id="5" />
          <Label htmlFor="5">Zone très sur dotée</Label>
        </div>
      </RadioGroup>
      <Map
        className="h-full w-full"
        width="800"
        height="600"
        center={DEFAULT_CENTER}
        zoom={6}
      >
        {/*//@ts-expect-error flemme d'ajouter les types*/}
        {({ TileLayer, Marker, Popup }) => (
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
          </>
        )}
      </Map>
    </Shell>
  );
}
