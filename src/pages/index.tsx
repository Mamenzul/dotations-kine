import Map from "@/components/Map/Map";
import { Shell } from "@/components/shells/shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import villes from "@/components/jsons/villes.json";

const DEFAULT_CENTER = [46.228245, 2.1895145];

export default function HomePage() {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const checkList = [
    { id: 1, state: one },
    { id: 2, state: two },
    { id: 3, state: three },
    { id: 4, state: four },
    { id: 5, state: five },
  ];
  const checkListFiltered = checkList
    .filter((el) => el.state === true)
    .map((el) => el.id);
  const filteredVilles = villes.filter((ville) =>
    checkListFiltered.includes(Number(ville.z)),
  );
  console.log(filteredVilles);
  return (
    <Shell>
      <div className="flex h-fit flex-col justify-between gap-2 md:flex-row">
        <div className="flex items-center space-x-2">
          <Checkbox id="1" onCheckedChange={(e: boolean) => setOne(e)} />
          <Label htmlFor="1">Zone très sous dotée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="2" onCheckedChange={(e: boolean) => setTwo(e)} />
          <Label htmlFor="2">Zone sous dotée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="3" onCheckedChange={(e: boolean) => setThree(e)} />
          <Label htmlFor="3">Zone intermédiaire</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="4" onCheckedChange={(e: boolean) => setFour(e)} />
          <Label htmlFor="4">Zone sur dotée</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="5" onCheckedChange={(e: boolean) => setFive(e)} />
          <Label htmlFor="5">Zone très sur dotée</Label>
        </div>
      </div>
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
