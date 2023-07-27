import  Axios  from 'axios'
import React , {useEffect, useState} from 'react'
import { ListGroup , ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Repos = (props) => {
    const [repos , changeRepos] = useState([]);

    
    const fetchData = async () => {
        const {data} = await Axios.get(props.api);
        changeRepos(data);
        console.log(data);
      }

    useEffect(()=>{
        if(props.api != null) fetchData();
    } , [props.api]);
    return(
        <ListGroup>
            {
                repos.map((repo)=>(
                    <a href={repo?.clone_url} target="_blank">
                    <ListGroupItem >
                        <p className="text-warning">{repo?.name}</p>

                    </ListGroupItem>
                    </a>
                ))
            }
        </ListGroup>
    )

  
}

export default Repos