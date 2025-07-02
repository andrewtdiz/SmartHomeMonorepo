import { Card, CardContent } from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";
import { useState, useEffect, useMemo } from "react";

import { Light } from "./components/Light";
import { Oven } from "./components/Oven";
import { Dishwasher } from "./components/Dishwasher";
import { Thermostat } from "./components/Thermostat";
import { Washer } from "./components/Washer";
import { Dryer } from "./components/Dryer";

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Smart Home Eleven </h1>

      {/* House Layout */}
      <div className="max-w-5xl bg-card mx-auto p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-6 gap-4 min-h-96">

          {/* Living Room */}
          <Card className="col-span-3 bg-blue-50 border-2 border-blue-200">
            <CardContent className="p-4 h-full flex flex-col">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Living Room</h3>
              <div className="flex-1 flex items-center justify-between">
                <Light className="w-8 h-8" location="Living Room" name="Light" />

                <Thermostat />
              </div>
            </CardContent>
          </Card>

          {/* Kitchen */}
          <Card className="col-span-3 bg-green-50 border-2 border-green-200">
            <CardContent className="p-4 h-full flex flex-col">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Kitchen</h3>
              <div className="flex-1 flex items-center justify-between space-y-2">
                <Light className="w-8 h-8" location="Kitchen" name="Light" />

                <Dishwasher />

                <Oven />
              </div>
            </CardContent>
          </Card>

          {/* Bedroom */}
          <Card className="col-span-2 bg-purple-50 border-2 border-purple-200">
            <CardContent className="p-4 h-full flex flex-col">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Bedroom</h3>
              <div className="flex-1 flex items-center justify-center space-x-2">
                <Light name="Main Light" className="w-8 h-8" location="Bedroom" />

                <Light name="Night Light" location="Bedroom" />
              </div>
            </CardContent>
          </Card>

          {/* Bathroom */}
          <Card className="col-span-2 bg-cyan-50 border-2 border-cyan-200">
            <CardContent className="p-4 h-full flex flex-col">
              <h3 className="text-lg font-semibold text-cyan-800 mb-4">Bathroom</h3>
              <div className="flex-1 flex flex-col items-center space-y-2 justify-between">
                <Light name="Light" className="w-8 h-8" location="Bathroom" />
              </div>
            </CardContent>
          </Card>

          {/* Laundry Room */}
          <Card className="col-span-2 bg-orange-50 border-2 border-orange-200">
            <CardContent className="p-4 h-full flex flex-col items-center w-full">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">Laundry</h3>
              <div className="flex-1 flex flex-col items-center justify-between">
                <Light name="Light" className="w-8 h-8" location="Laundry" />

                <div className="flex space-x-2">
                  <Washer />
                  <Dryer />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}

export default App;
