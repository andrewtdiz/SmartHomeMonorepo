class DryerUpdate {
    result "turn_off" | "do_nothing"
}

function HandleDryer(dryer: string, query: string) -> DryerUpdate {
  client CerebrasQwen3  
  prompt #"
    You are a home assistant.

    You are given the state of the dryer and a user's request, update the dryer or turn it off.

    You have the following dryer:
    {{ dryer }}

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ query }}
  "#
}

test test_dryer {
  functions [HandleDryer]
  args {
    dryer "Finishes in: 5 minutes"
    query "how much longer will it take to finish?"
  }
}
