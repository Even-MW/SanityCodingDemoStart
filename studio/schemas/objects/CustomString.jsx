// Import UI components from Sanity UI
import { Label, Stack, TextInput } from '@sanity/ui'

import React from 'react'

export const CustomString = React.forwardRef((props, ref) => {
    return (
        <Stack space={2}>
            <Label>{props.type.title} :D </Label>
            <TextInput value={props.value} />
        </Stack>
    )
}
)

// Create the default export to import into our schema
export default CustomString
