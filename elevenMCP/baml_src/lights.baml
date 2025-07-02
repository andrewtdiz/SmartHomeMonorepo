class LightsResult {
    location string
    name string
    isOn bool
}

function HandleLights(lights: string, query: string) -> LightsResult[] {
  client CerebrasLlama
  prompt #"
    You are a home assistant.

    You are given a user's request and you need to handle it.

    You have the following locations and their light names:
    {{ lights }}

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}



test test_lights {
  functions [HandleLights]
  args {
    lights "Living Room: Light\nBathroom: Light\nLaundry: Light\nKitchen: Light\nBedroom: Main Light, Night Light"
    query "Turn on all the lights in the house"
  }
}
