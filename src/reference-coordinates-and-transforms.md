# Coordinate System & Transforms

Pax's coordinate system is "top-left origin; right is positive x; down is positive y"


### Affine transforms (Transform2D)

The way elements get positioned, sized, and moved around in Pax is through the powerful `transform` property.  This property is nearly ubiquitous across GUI and graphical development tools (such as `matrix3d()` in CSS), but it is often not as front-and-center as it is in Pax.

Perhaps the easiest way to think about Pax's transform model is "design tool coordinates."  That is, when you select an element in a vector design tool like Figma, Sketch, or Illustrator, you can: _drag_ it (`translate`), _resize_ it (`scale`), _rotate_ it, and _shear_ it (with a combination of rotation and scale.)  Each of these operations can be expressed in Pax, as well.

```
<Group id=a transform=Transform2D::rotate(150deg)>
    <Rectangle id=b transform=Transform2D::translate(50px, 50px) />
    <Rectangle id=c transform=Transform2D::scale(150%, 150%) />
</Group>
```

In the above example, rectangle `b` will be moved 50px to the right and 50px down.  The rectangle `c` will be 150% the width & height of its default values.  And the group `a` will be rotated 150 degrees — which, in fact, ends up rotating both of the rectangles as well.  Read more about this below in "combining transformations."


### Anchor & Align
Pax's coordinate system also has a notion of `anchor` — letting you set the "origin point" for transformations to an element.  For example, using `anchor` you can cause a rectangle to be rotated around its top-left corner, vs. rotated around its centerpoint.  

**TODO: insert image of an Anchor UI, e.g. from Flash/AI/Figma -- or animated example**

Pax also includes a notion of `align` -- that is: where _relative to the parent_ an element should be mounted.  For example: "align this element's `anchor` point to the _top left_ of the parent container", or "align this element's anchor point to the _center point_ of the parent container".

**TODO: insert image illustrating alignment relative to parent container**

The combination of `anchor` and `align` offers powerful, fine-grained positioning, well suited to designing for multiple screen sizes.



### Combining transformations

What happens when you want to both resize AND rotate an element?  You must _combine transformations_.  Depending on your needs, there are two broad ways to combine transformations:

 1. Hierarchical composition

When you transform an element that can contain other elements -- such as a `<Group>...</Group>`, all of its children elements will _inherit_ that transformation as a starting point.  For example:

```
<Group id=groo >
    <Rectangle id=ree />
</Group>
```

If a `transform` is applied to the group `groo`, such as a translation by 50px to the right, all descendants (in this case, the rectangle `ree`) will also be automatically translated by 50px to the right.  This translation occurs _after_ all of `ree`'s transform logic is calculated, and is handled by Pax's core rendering engine.

This notion of hierarchy is hopefully intuitive — and once again, it abides by "vector design tool coordinate space" — specifically the behavior of grouped elements when you drag or resize the root of the group.

 2. Matrix multiplication

Often times, you will want to combine transformations on a single element, without using any sort of nesting.  In these cases, you will want to _multiply transforms._  This entails two steps:

  1. use an expression (`{...}`) for the transform value, and
  2. multiply different affine operations within that expression

The reason multiplication is the combinational operator for transformations stems from linear algebra, where _matrix multiplication_ describes the sequential combination of _affine transformation matrices._

An example of combining multiple transformations with matrix multiplication:

```jsx
<Rectangle width=100px height=200px transform={
    rotate(100deg) *
    translate(100px, 100px) *
    scale(200%, 200%)
} />
```

In the above, the 100px square will be rotated, then translated (moved), then scaled (resized).

A few important notes about matrix multiplication:

    1. Order matters — for example `translate() * rotate()` will generally yield different behavior vs. `rotate() * translate()`.
    2. You can combine the same operation multiple times — for example `scale() * scale()` or `rotate() * scale() * rotate()`
    3. Since these multiplications happen in an `expression` context, you may also use `properties` in these expressions — for example `rotate(self.base_rotation * self.rotation_multiplier)` or `scale(self.scale_mult) * rotate(self.active_rotation)`


Organizationally, you may find that it is useful to combine hierarchical grouping with matrix multiplication in different ways.  You may also make use of helper methods which can return dynamic or pre-computed transformations.  Finally, the use of layout components (such as `pax-std`'s `Stacker`, or components that you may author yourself) allow you to abstract complex positioning and resizing logic without needing to think too much about it.

--

[1] Affine transforms:  https://en.wikipedia.org/wiki/Affine_transformation
[2] In fact, Pax doesn't even have a specific notion of _position_ — elements are all technically _positioned_ at the viewport origin (top-left) and all "positioning" that we see is executed through affine `translations`.  This design decision could be revisited, but was ultimately decided as "one fewer feature to implement" by initial author.


Example

Pax elements _do not_ have a position property.  Every element is conceptually "positioned" at the origin — in order to move elements around, they must be `transformed`.  See footnotes for recommended reading on _affine transforms_[1]





