import { Gene } from 'murv-component'

class GeneExample{
    static params = {
        shape: Gene.shape.BAR,
        color: Gene.color.FROM_DATA,
        color_key: Gene.color_key.OFF,
        path_points: Gene.path_points.EVEN,
        path_mode: Gene.path_mode.INLINE,
        path_rotation: Gene.path_rotation.NONE,
        path_grouping: Gene.path_grouping.NONE,
        object_rotation: Gene.object_rotation.NONE,
        object_size: Gene.object_size.FULL,
        filter: Gene.filter.OFF,
        debugging: Gene.debugging.OFF
    }
}

export default GeneExample;