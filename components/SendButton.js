import { useColorMode, IconButton } from '@chakra-ui/react'
import { AiOutlineSend } from 'react-icons/ai'


const SendButton = (props) => {
    return (
        <IconButton
            aria-label="Enter"
            as={AiOutlineSend}
            color={props.Color}
            bg={props.bgColor}
            fontSize={props.fontSize}
            _hover={{color:props.hoverColor, cursor:"pointer"}}
            onClick={props.onClick}
        />

    )
}

export default SendButton