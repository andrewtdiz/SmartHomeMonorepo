class OvenUpdate {
    result "update" | "turn_off" | "share_info" | "do_nothing"
    targetTemperature int?
}


function HandleOven(oven: string, query: string) -> OvenUpdate {
  client CerebrasQwen3  
  prompt #"
    You are a home assistant.

    You are given the state of the oven and a user's message.
    If the user just asks for current information, simply return with result: share_info.
    Only turn the oven off if the user specifically asks you to.

    You have the following oven:
    {{ oven }}

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}

test test_oven {
  functions [HandleOven]
  args {
    oven "isOn: true, isPreheating: false, currentTemperature: 350, targetTemperature: 450"
    query "Did I leave the oven on?"
  }
}
