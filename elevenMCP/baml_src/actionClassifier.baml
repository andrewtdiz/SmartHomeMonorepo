enum Action {
  LIGHTS
  DISH
  OVEN
  WASHER
  DRYER
  THERMOSTAT
  UNKNOWN
}

function ActionClassifier(query: string) -> Action {
  client CerebrasLlama
  prompt #"
    You are a home assistant. You are given a user's request and you need to classify it into an action.

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}










test test_lights {
  functions [ActionClassifier]
  args {
    query "Turn on the lights in the living room"
  }
}
