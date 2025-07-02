type ThermostatMode = "heat" | "cool"

class ThermostatUpdate {
    result "update" | "turn_off" | "share_info" | "do_nothing"
    mode ThermostatMode?
    targetTemperature int?
    currentTemperature int?
}

function HandleThermostat(thermostat: string, query: string) -> ThermostatUpdate {
  client CerebrasQwen3  
  prompt #"
    You are a home assistant.

    You are given the state of the thermostat and a user's message.
    If the user just asks for current information, simply return with result: share_info.
    Only update the thermostat or turn it off if the user specifically asks you to.

    You have the following thermostat:
    {{ thermostat }}

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}

test test_thermostat {
  functions [HandleThermostat]
  args {
    thermostat "On: true, Mode: cool, Current Temperature: 72, Target Temperature: 70"
    query "Hey, what's the thermostat set to? It's like kind of cold in here."
  }
}
