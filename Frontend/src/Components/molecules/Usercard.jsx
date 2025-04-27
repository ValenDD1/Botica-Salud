//atomos
import { Text } from "../atoms/Titles/Text"
import { Title } from "../atoms/Titles/Title"

export const Usercard=({data})=>{
    return(
        <div className="user-card" >
            <Title title={data?.name} hs="h2" ></Title>
            <Text text={data?.email} ></Text>
            <Text text={data?.phone} ></Text>
        </div>
    )
}