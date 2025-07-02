class DishwasherUpdate {
    result "turn_off" | "do_nothing"
}

function HandleDishwasher(dishwasher: string, query: string) -> DishwasherUpdate {
  client CerebrasQwen3  
  prompt #"
    You are a home assistant.

    You are given the state of the dishwasher and a user's request, update the dishwasher or turn it off.

    You have the following dishwasher:
    {{ dishwasher }}

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}

test test_dishwasher {
  functions [HandleDishwasher]
  args {
    dishwasher "isOn: true, Finishes in: 5 minutes"
    query "how much longer will it take to finish?"
  }
}
